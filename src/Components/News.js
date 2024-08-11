import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'in', // Default values should be suitable for your use case
    category: 'general',
    pageSize: 20,
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
    apiKey: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      error: null,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsMonkey`;
  }

  async fetchArticles(page = this.state.page) {
    this.props.setProgress(30);
    const { pageSize, country, category, apiKey } = this.props;
    
    // Adjust the endpoint based on the category and country
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;
    
    console.log(`Fetching articles from URL: ${url}`);
    this.setState({ loading: true });
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const parsedData = await response.json();
      console.log('Parsed Data:', parsedData);
  
      if (parsedData.articles && parsedData.articles.length > 0) {
        this.setState({
          articles: parsedData.articles,
          loading: false,
          page,
          totalResults: parsedData.totalResults || 0,
          error: null,
        });
      } else {
        this.setState({
          articles: [],
          loading: false,
          error: 'No articles found',
        });
      }
  
    } catch (error) {
      console.error("Error fetching the news articles:", error);
      this.setState({ loading: false, error: error.message });
    }
  
    this.props.setProgress(100);
  }
  
  componentDidMount() {
    this.fetchArticles();
    console.log('API Key:', process.env.REACT_APP_NEWS_API_KEY);

  }

  handleNextClick = async () => {
    const nextPage = this.state.page + 1;
    if (nextPage <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
      this.fetchArticles(nextPage);
    }
  };

  handlePreviousClick = async () => {
    const prevPage = this.state.page - 1;
    if (prevPage > 0) {
      this.fetchArticles(prevPage);
    }
  };

  render() {
    const { articles, loading, error, page, totalResults } = this.state;
    const { pageSize, category } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className='container my-5'>
        <h1 className='text-center'>
          NewsMonkey - Top Headlines from {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
        <div className="row my-5">
          {articles.length > 0 ? (
            articles.map((article) => (
              <div className="col-md-4" key={article.url}>
                <NewsItem 
                  title={article.title ? article.title.slice(0, 50) : "No Title"} 
                  description={article.description ? article.description.slice(0, 100) : "No Description"} 
                  imgUrl={article.urlToImage || "https://via.placeholder.com/150"} 
                  newsUrl={article.url}
                  author={article.author || "Unknown"}
                  date={new Date(article.publishedAt).toGMTString()}
                />
              </div>
            ))
          ) : (
            <div>No articles found</div>
          )}
        </div>
        <div className="container d-flex justify-content-between">
          <button 
            disabled={page <= 1} 
            type="button" 
            className="btn btn-primary" 
            onClick={this.handlePreviousClick}
            aria-label="Previous Page"
          >
            &larr; Previous
          </button>
          <button 
            disabled={page + 1 > Math.ceil(totalResults / pageSize)} 
            type="button" 
            className="btn btn-primary" 
            onClick={this.handleNextClick}
            aria-label="Next Page"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;

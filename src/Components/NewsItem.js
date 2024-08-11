import React from 'react';
import PropTypes from 'prop-types';

const NewsItem = ({ title, description, imgUrl, newsUrl, author, date }) => {
  return (
    <div className="card my-3">
      <img 
        src={imgUrl || "https://i.insider.com/66b4e113955b01c3294ce48e?width=1200&format=jpeg"} 
        className="card-img-top" 
        alt={title || "News image"} 
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text"><small className="text-muted">By {author} on {date}</small></p>
        <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">Read More</a>
      </div>
    </div>
  );
};

NewsItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imgUrl: PropTypes.string,
  newsUrl: PropTypes.string.isRequired,
  author: PropTypes.string,
  date: PropTypes.string.isRequired,
};

export default NewsItem;

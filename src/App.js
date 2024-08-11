// App.js
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  pageSize = 20;
  apiKey = process.env.REACT_APP_NEWS_API_KEY;

  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({ progress });
  };

  render() {
    return (
      <Router>
        <Navbar />
        <LoadingBar height={3} color='#f11946' progress={this.state.progress} />
        <Routes>
          <Route path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} category="general" pageSize={this.pageSize} country="in" />} />
          <Route path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} category="sports" pageSize={this.pageSize} country="in" />} />
          <Route path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} category="business" pageSize={this.pageSize} country="in" />} />
          <Route path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} category="entertainment" pageSize={this.pageSize} country="in" />} />
        </Routes>
      </Router>
    );
  }
}

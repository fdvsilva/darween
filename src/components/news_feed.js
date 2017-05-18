import React from 'react';
import FontAwesome from 'react-fontawesome';
import {PropTypes} from 'prop-types';

import News from './news.js';


function buildNews(newsData) {
  let news = [];
  for (var i = 0; i< newsData.length; i++) {
      news.push(<News
                  message={newsData[i].message}
                  date={newsData[i].date}
                  alert={newsData[i].alert}
                  key={i}
                  />);
  }
  return news;
}

const NewsFeed = (props) => {
    return (
      <div>
        <input className="toggle" type="checkbox" id="news-feed"/>
        <div className="news-feed">
          <label htmlFor="news-feed" className="expand-news">
            <FontAwesome  name='chevron-circle-down'/>
          </label>
          {buildNews(props.news)}
        </div>
      </div>
    );
}

NewsFeed.propTypes = {
  news: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    date: PropTypes.object
  }))
};


NewsFeed.defaultProps = {
  news: []
}

export default NewsFeed;

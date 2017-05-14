import React from 'react';
import FontAwesome from 'react-fontawesome';

const NewsFeed = () => {
    return (
      <div className="news-feed">
      <FontAwesome className="expand-news" name='chevron-circle-down' />
      <div className="news-entry">
        <FontAwesome className="news-icon" name='user-circle-o' />
        <p> User Blue has just added his point of view ! :) </p>
        <span className="time"> 22:45 </span>
      </div>
      <div className="news-entry">
        <FontAwesome className="news-icon" name='user-circle-o' />
        <p> User Orange has been screened out this circle!  :) </p>
        <span className="time"> 22:45 </span>
      </div>
      <div className="news-entry">
        <FontAwesome className="news-icon" name='info-circle' />
        <p> A new circle has just started! Enjoy :) </p>
        <span className="time"> 22:45 </span>
      </div>
      <div className="news-entry">
        <FontAwesome className="news-icon" name='user-circle-o' />
        <p> User Blue has just added his point of view ! :) </p>
        <span className="time"> 22:45 </span>
      </div>
      <div className="news-entry">
        <FontAwesome className="news-icon" name='user-circle-o' />
        <p> User Orange has been screened out this circle!  :) </p>
        <span className="time"> 22:45 </span>
      </div>
      <div className="news-entry">
        <FontAwesome className="news-icon" name='info-circle' />
        <p> A new circle has just started! Enjoy :) </p>
        <span className="time"> 22:45 </span>
      </div>
      <div className="news-entry">
        <FontAwesome className="news-icon" name='user-circle-o' />
        <p> User Blue has just added his point of view ! :) </p>
        <span className="time"> 22:45 </span>
      </div>
      <div className="news-entry">
        <FontAwesome className="news-icon" name='user-circle-o' />
        <p> User Orange has been screened out this circle!  :) </p>
        <span className="time"> 22:45 </span>
      </div>
      <div className="news-entry">
        <FontAwesome className="news-icon" name='info-circle' />
        <p> A new circle has just started! Enjoy :) </p>
        <span className="time"> 22:45 </span>
      </div>
      </div>
    );
}

export default NewsFeed;

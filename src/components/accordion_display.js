import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import {PropTypes} from 'prop-types';

import Topic from './Topic.js';
import SlidableMenu from './slidable_menu.js';
import Player from './player_pov.js';
import Notification from './notification.js';

function buildTopics(topicsData) {
  let topics = []
  for (let i=0; i< topicsData.length; i++) {
    topics.push(<Topic topicData={topicsData[i]} id={i} key={i}/>);
  }
  return topics;
}

function buildDownvotes(downvotes) {

  let players = []
  for (let i=0; i< downvotes.length; i++) {
    //console.log("topicId: " + topicId + i);
    players.push(<Player  name={downvotes[i].playerName}
      color={downvotes[i].playerColor}
      key={i}
      id={`${i}`}
      />);
    }
    return players;
  }

  function buildNotifications(notifications) {
    let notifs = []
    for (let i=0; i< notifications.length; i++) {
      notifs.push(<Notification title={notifications[i].title}
                                body={notifications[i].body}
                                id={`${i}`}
                                key={i}/>);
    }
    return notifs;
  }

const AccordionDisplay = (props) => {


  return (
    <div className="accordion">
      <SlidableMenu title="Topics" iconName="commenting-o">
        {buildTopics(props.topicsData)}
      </SlidableMenu>
      <SlidableMenu title="Downvotes" iconName="thumbs-o-down">
        {buildDownvotes(props.downvotes)}
      </SlidableMenu>
      <SlidableMenu title="Notifications" iconName="globe">
        {buildNotifications(props.notifications)}
      </SlidableMenu>

    </div>
  );
}

AccordionDisplay.propTypes = {

  topicsData: PropTypes.arrayOf(PropTypes.shape({
    topic: PropTypes.string,
    playersPOV: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      name: PropTypes.string
    }))
  })),
  downvotes: PropTypes.arrayOf(PropTypes.shape({
    playerName: PropTypes.string,
    playerColor: PropTypes.string
  })),
  notifications: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string
  }))
}


AccordionDisplay.defaultProps = {
  topicData: [],
  downvotes: [],
  notifications: []
}

export default AccordionDisplay;

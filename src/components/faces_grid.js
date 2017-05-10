import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';


const FacesGrid = (props) => {

  function generateFaces(numberRows, facePicsNames) {
    let rows = [], rowFaces = []
    for (let i = 0; i < numberRows; i++) {
      for (let j = 0; j < facePicsNames[i].length; j++) {
        var faceStyles = {
          backgroundImage: `url('/assets/images/${facePicsNames[i][j]}')`
        };
        rowFaces.push(<div className="face" style={faceStyles} key={facePicsNames[i][j] + i + j}></div>);
      }
      rows.push(<div className="row" key={i}> {rowFaces} </div>);
      rowFaces = [];
    }
    return rows;
  }

  return (
    <div className="grid">
    {generateFaces(props.numberRows, props.facePicsNames)}
    </div>
  );
}

export default FacesGrid;

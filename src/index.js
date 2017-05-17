import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';

import Sidebar from '../src/components/sidebar.js'
import Header from '../src/components/header.js';
//import Tile from '../src/components/tile.js';
import Footer from '../src/components/footer.js';
import GameBoard from '../src/components/game_board.js';
import GenericModal from '../src/components/generic_modal.js';

const App = () => {

  function confirmationModal() {
    return (
      <GenericModal height="100px" title="Reading" okText="Yes">
          <h3> Done reading <FontAwesome className="icon-message" name='question-circle' /> </h3>
      </GenericModal>
    )
  }

  function POVModal() {
    return (
      <GenericModal height="300px" title="POV" okText="Yes" timer="true" maxChars="300"
                    warningMessage="Insert your point of view below"
                    >
          <textarea />
      </GenericModal>
    )
  }

  function contactModal() {
    return (
      <GenericModal height="300px" width="350px" title="Contact us" okText="Submit"
                    maxChars={300} adjustForContactModal={true}

                    >
          <textarea />
      </GenericModal>
    )
  }

  return (
    <div>
      
      <Sidebar />
      <Header loggedIn="true"/>
      <GameBoard />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

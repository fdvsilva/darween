import React from 'react';
import ReactDOM from 'react-dom';

import Sidebar from '../src/components/sidebar.js'
import Header from '../src/components/header.js';
//import Tile from '../src/components/tile.js';
import Footer from '../src/components/footer.js';
import GameBoard from '../src/components/game_board.js';
import ModalWrapper from '../src/components/modal_wrapper.js';

const App = () => {
  return (
    <div>
      <ModalWrapper />
      <Sidebar />
      <Header loggedIn="true"/>
      <GameBoard />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

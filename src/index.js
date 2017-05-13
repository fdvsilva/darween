import React from 'react';
import ReactDOM from 'react-dom';

import Header from '../src/components/header.js';
//import Tile from '../src/components/tile.js';
import Footer from '../src/components/footer.js';
import GameBoard from '../src/components/game_board.js';

const App = () => {
  return (
    <div>
      <Header />
      <GameBoard />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';

//import '../dist/app.css';

import Header from '../src/components/header.js';
import Tile from '../src/components/tile.js';
import Footer from '../src/components/footer.js';

const App = () => {
  return (
    <div>
      <Header />
      {/* Main Tile */}
      <Tile
        message="They say great minds think alike ..."
        skewAreasP={true}
        displayScrollDownMarkerP={true}

       />
      {/* Second Tile */}
       <Tile
         message="What if, you could find your mind mate ..."
         background="linear-gradient(to top left, hsla(65, 100%, 80%, 0.9), white)"
         height="100vh"
         skewAreasP={false}
        />
      {/* Third Tile */}
        <Tile
          message="By screening out who has a different point of view !"
          background="linear-gradient(to top right, hsla(55, 100%, 80%, 0.9), white)"
          height="100vh"
          skewAreasP={false}
          />
        {/* Fourth Tile */}
         <Tile
          message="Until you just find him, wanna try ?"
          background="linear-gradient(to top right, hsla(35, 100%, 80%, 0.9), white)"
          height="100vh"
          skewAreasP={false}
          />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

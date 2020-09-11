import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.scss';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/* <App 
        songs={res.songs} 
        artists={res.artists}  
        library={res.library}
        discover={res.discover}
        footer={res.footer}
        mode={res.mode}/> */}
        <App/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

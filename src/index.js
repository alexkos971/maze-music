import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { rootReducer } from './redux/rootReducer';

import './index.scss';
import App from './App';


const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  
  ));


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}> 
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

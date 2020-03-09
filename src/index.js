import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {ModalState} from "./components/Context/modalContext/ModalState";
import {PreloaderState} from './components/Context/preloaderContext/PreloaderState';

const application = (
    <Router>
      <PreloaderState>
        <ModalState>
          <App/>
        </ModalState>
      </PreloaderState>
    </Router>
);
ReactDOM.render(application, document.getElementById('root'));
serviceWorker.unregister();

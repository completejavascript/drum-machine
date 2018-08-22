import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const rootNode = document.querySelector("#root");
ReactDOM.render(<App displayTextDefault="Drum machine" />, rootNode);

registerServiceWorker();

import React,{ StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( 
<StrictMode>
    <App />
</StrictMode>, document.getElementById('root'));
registerServiceWorker();



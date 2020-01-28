import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Reader from 'components/reader'
import 'bootstrap/dist/css/bootstrap.min.css';

// Disable console logs in prod 
if (process.env.NODE_ENV !== 'development') {
    console.log = () => { };
}

ReactDOM.render(<Reader />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

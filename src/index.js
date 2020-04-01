import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from "./routers/appRouter";
import {Provider} from "react-redux";
import store from './redux/store/store'

// Disable console logs in prod 
if (process.env.NODE_ENV !== 'development') {
    console.log = () => {
    };
    console.error = () => {
    }
}

ReactDOM.render(
    <Provider store={store}>
        <AppRouter/>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

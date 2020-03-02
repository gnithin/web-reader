import {createStore} from "redux";
import reducer from 'redux/reducers'

const store = createStore(reducer);

// Enable debugging store only on development
if (process.env.NODE_ENV === 'development') {
    window.store = store;
}

export default store

import {combineReducers} from "redux";
import articleReducer from "./articleReducer";
import dataEntryReducer from "./dataEntryReducer";

export default combineReducers({
                                   article: articleReducer,
                                   dataEntry: dataEntryReducer,
                               })

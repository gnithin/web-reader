import {combineReducers} from "redux";
import articleReducer from "./articleReducer";
import dataEntryReducer from "./dataEntryReducer";
import articlesListReducer from "./articlesListReducer";
import pathReducer from "./pathReducer";

export default combineReducers({
                                   article: articleReducer,
                                   articlesList: articlesListReducer,
                                   dataEntry: dataEntryReducer,
                                   path: pathReducer,
                               })

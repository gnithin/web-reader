import {combineReducers} from "redux";
import articleReducer from "./articleReducer";
import dataEntryReducer from "./dataEntryReducer";
import articlesListReducer from "./articlesListReducer";

export default combineReducers({
                                   article: articleReducer,
                                   articlesList: articlesListReducer,
                                   dataEntry: dataEntryReducer,
                               })

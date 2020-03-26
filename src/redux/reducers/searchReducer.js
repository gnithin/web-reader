import {ADD_SEARCH_TAGS, SEARCH_DATA} from "../actions/searchActions";

const initialState = {
    data: [],
    tags: []
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SEARCH_TAGS:
            return {
                ...state,
                tags: action.data,
            };
        break;
        
        case SEARCH_DATA:
                return {
                    ...state,
                    data: action.data
                };
        break;
        default:
            return state;
    }
};

export default searchReducer;
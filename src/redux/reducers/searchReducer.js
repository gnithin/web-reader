import {APPEND_SEARCH_TAG, SET_SEARCH_TAGS} from "../actions/searchActions";

const initialState = {
    searchResults: [],
    tags: []
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_TAGS: {
            return {
                ...state,
                tags: action.data,
            };
        }

        case APPEND_SEARCH_TAG: {
            return {
                ...state,
                tags: [...state.tags, action.data]
            }
        }

        default:
            return state;
    }
};

export default searchReducer;

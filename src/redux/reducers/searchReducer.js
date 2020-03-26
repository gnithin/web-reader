import {
    APPEND_SEARCH_TAG,
    DELETE_SEARCH_TAG_INDEX,
    SET_SEARCH_RESULTS,
    SET_SEARCH_TAGS
} from "../actions/searchActions";

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

        case SET_SEARCH_RESULTS: {
            return {
                ...state,
                searchResults: [...action.data],
            }
        }

        case DELETE_SEARCH_TAG_INDEX: {
            let index = action.data;
            if (index < 0 || index >= state.tags.length) {
                return state;
            }

            state.tags.splice(index, 1);
            return {
                ...state,
                tags: [...state.tags],
            }
        }

        default:
            return state;
    }
};

export default searchReducer;

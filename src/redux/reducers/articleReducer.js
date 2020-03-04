// NOTE: This does not do anything for now.
import {ACTION_ADD_ARTICLE} from "../actions/articleActions";

const initialState = {
    data: {},
};

const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_ADD_ARTICLE:
            return {
                ...state,
                data: action.data,
            };

        default:
            return state;
    }
};

export default articleReducer;
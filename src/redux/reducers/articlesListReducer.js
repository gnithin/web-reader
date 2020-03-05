import {ACTION_UPDATE_ARTICLES_LIST} from "../actions/articlesListActions";

const initialState = {
    data: [],
};

const articlesListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_UPDATE_ARTICLES_LIST:
            return {
                ...state,
                data: [...action.data],
            };

        default:
            return state;
    }
};

export default articlesListReducer;

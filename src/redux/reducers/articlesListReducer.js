import {
    ACTION_SELECT_ARTICLE_FROM_LIST,
    ACTION_UPDATE_ARTICLES_LIST
} from "../actions/articlesListActions";

const initialState = {
    data: [],
    selectedIndex: null,
};

const articlesListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_UPDATE_ARTICLES_LIST:
            return {
                ...state,
                data: [...action.data],
            };

        case ACTION_SELECT_ARTICLE_FROM_LIST:
            return {
                ...state,
                selectedIndex: action.data,
            };

        default:
            return state;
    }
};

export default articlesListReducer;

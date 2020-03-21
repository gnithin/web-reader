import {
    ACTION_SELECT_ARTICLE_FROM_LIST,
    ACTION_UPDATE_AND_SELECT_ARTICLE_FROM_LIST,
    ACTION_UPDATE_ARTICLES_LIST
} from "../actions/articlesListActions";

const initialState = {
    data: [],
    selectedIndex: null,
    selectedArticle: null,
};

const articlesListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_UPDATE_ARTICLES_LIST:
            return {
                ...state,
                selectedIndex: null,
                selectedArticle: null,
                data: [...action.data],
            };

        case ACTION_SELECT_ARTICLE_FROM_LIST:
            let index = action.data;
            if (index < 0 || index >= state.data.length) {
                return state;
            }
            return {
                ...state,
                selectedIndex: index,
                selectedArticle: state.data[index],
            };

        case ACTION_UPDATE_AND_SELECT_ARTICLE_FROM_LIST: {
            let index = action.data.index;
            let articles = action.data.articles;
            if (index < 0 || index >= articles.length) {
                return state;
            }

            return {
                ...state,
                data: [...articles],
                selectedIndex: index,
                selectedArticle: articles[index],
            };
        }

        default:
            return state;
    }
};

export default articlesListReducer;

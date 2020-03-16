import ActionUtils from "./actionUtils";

export const ACTION_UPDATE_ARTICLES_LIST = "add-articles-list";
export const ACTION_SELECT_ARTICLE_FROM_LIST = "select-from-articles-list";

export default class ArticlesListActions {
    static updateArticlesList(articlesList) {
        return ActionUtils.createAction(ACTION_UPDATE_ARTICLES_LIST, articlesList);
    }

    static selectFromArticlesList(index) {
        return ActionUtils.createAction(ACTION_SELECT_ARTICLE_FROM_LIST, index);
    }
}
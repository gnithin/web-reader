import ActionUtils from "./actionUtils";

export const ACTION_UPDATE_ARTICLES_LIST = "add-articles-list";

export default class ArticlesListActions {
    static updateArticlesList(articlesList) {
        return ActionUtils.createAction(ACTION_UPDATE_ARTICLES_LIST, articlesList);
    }
}

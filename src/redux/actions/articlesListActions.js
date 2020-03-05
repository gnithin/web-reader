import ActionUtils from "./actionUtils";

export const ACTION_UPDATE_ARTICLES_LIST = "add-article";

export default class ArticlesListActions {
    static updateArticlesList(articlesList) {
        return ActionUtils.createAction(ACTION_UPDATE_ARTICLES_LIST, articlesList);
    }
}

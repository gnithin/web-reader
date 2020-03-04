import ActionUtils from "./actionUtils";

export const ACTION_ADD_ARTICLE = "add-article";

export default class ArticleActions {
    static addArticleData(article) {
        return ActionUtils.createAction(ACTION_ADD_ARTICLE, article);
    }
}

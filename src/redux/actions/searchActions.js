import ActionUtils from "./actionUtils";

export const ADD_SEARCH_TAGS = "add-search-tags";
export const SEARCH_DATA = "search-data";

export default class SearchActions {
    static addSearchTags(tags) {
        return ActionUtils.createAction(ADD_SEARCH_TAGS, tags);
    }

    static updateSearchData(data) {
        return ActionUtils.createAction(SEARCH_DATA, data);
    }
}

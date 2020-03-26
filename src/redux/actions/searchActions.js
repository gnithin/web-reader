import ActionUtils from "./actionUtils";

export const SET_SEARCH_TAGS = "set-search-tags";
export const SET_SEARCH_RESULTS = "set-search-results";
export const APPEND_SEARCH_TAG = "append-search-tag";

export default class SearchActions {
    static setSearchTags(tags) {
        return ActionUtils.createAction(SET_SEARCH_TAGS, tags);
    }

    static setSearchResults(results) {
        return ActionUtils.createAction(SET_SEARCH_RESULTS, results);
    }

    static addSearchTag(tag) {
        return ActionUtils.createAction(APPEND_SEARCH_TAG, tag);
    }

}

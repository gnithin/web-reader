import ActionUtils from "./actionUtils";

export const ACTION_UPDATE_CONTENT = "update-contents";
export const ACTION_RESET_CONTENT = "reset-content";
export const ACTION_ADD_CONTENT = "reset-content";
export const ACTION_DELETE_CONTENT = "delete-content";

export const ACTION_CF_ADD = "add-custom-formatter";
export const ACTION_CF_DELETE = "delete-custom-formatter";
export const ACTION_CF_UPDATE = "update-custom-formatter";

export const ACTION_SET_TITLE = "add-title";
export const ACTION_SET_TAGS = "set-tags";
export const ACTION_SET_PARENT_ID = "set-parent-id";

export const ACTION_SET_DATA_ENTRY = "set-data-entry";
export const ACTION_RESET_DATA_ENTRY = "reset-data-entry";

export default class DataEntryActions {
    static setTitle(title) {
        return ActionUtils.createAction(ACTION_SET_TITLE, title);
    }

    static setTags(tags) {
        return ActionUtils.createAction(ACTION_SET_TAGS, tags);
    }

    static setParentId(parent, parentId) {
        return ActionUtils.createAction(ACTION_SET_PARENT_ID, {parent, parentId});
    }

    static addContent(content) {
        return ActionUtils.createAction(ACTION_ADD_CONTENT, content);
    }

    static updateContentsForIndex(content, contentIndex) {
        return ActionUtils.createAction(ACTION_UPDATE_CONTENT,
                                        {
                                            content: content,
                                            index: contentIndex,
                                        })
    }

    static deleteContentIndex(index) {
        return ActionUtils.createAction(ACTION_DELETE_CONTENT, index)
    }

    static resetContents() {
        return ActionUtils.createAction(ACTION_RESET_CONTENT, null)
    }

    static addCustomFormatter(contentIndex, data) {
        return ActionUtils.createAction(ACTION_CF_ADD, {
            contentIndex: contentIndex,
            cfData: data,
        })
    }

    static updateCustomFormatter(contentIndex, formatterIndex, data) {
        return ActionUtils.createAction(ACTION_CF_UPDATE, {
            contentIndex: contentIndex,
            formatterIndex: formatterIndex,
            cfData: data,
        })
    }

    static deleteCustomFormatter(contentIndex, formatterIndex) {
        return ActionUtils.createAction(ACTION_CF_DELETE, {
            contentIndex: contentIndex,
            formatterIndex: formatterIndex,
        });
    }

    static resetAdminData() {
        return ActionUtils.createAction(ACTION_RESET_DATA_ENTRY, null);
    }

    static setAdminData(data) {
        return ActionUtils.createAction(ACTION_SET_DATA_ENTRY, data);
    }
}

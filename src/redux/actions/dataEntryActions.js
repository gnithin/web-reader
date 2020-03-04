import ActionUtils from "./actionUtils";

export const ACTION_UPDATE_CONTENT = "update-contents";
export const ACTION_RESET_CONTENT = "reset-content";
export const ACTION_ADD_CONTENT = "reset-content";
export const ACTION_DELETE_CONTENT = "delete-content";


export default class DataEntryActions {
    static addContent(content) {
        return ActionUtils.createAction(ACTION_ADD_CONTENT, content);
    }

    static updateContents(contents) {
        return ActionUtils.createAction(ACTION_UPDATE_CONTENT, contents)
    }

    static deleteContentIndex(index) {
       return ActionUtils.createAction(ACTION_DELETE_CONTENT, index)
    }

    static resetContents() {
        return ActionUtils.createAction(ACTION_RESET_CONTENT, null)
    }
}

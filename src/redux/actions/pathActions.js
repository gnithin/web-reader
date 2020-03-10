import ActionUtils from "./actionUtils";

export const ACTION_ADD_PATH = "add-path";
export const ACTION_RESET_PATH = "reset-path";

export default class PathActions {
    static addPath(path) {
        return ActionUtils.createAction(ACTION_ADD_PATH, path);
    }

    static resetPaths() {
        return ActionUtils.createAction(ACTION_RESET_PATH, null)
    }
}

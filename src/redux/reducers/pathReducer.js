import {ACTION_ADD_PATH, ACTION_RESET_PATH} from "../actions/pathActions";

const initialState = {
    pathList: [],
    currPathEntry: null,
};

const pathReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_ADD_PATH:
            return {
                ...state,
                pathList: [...state.pathList, action.data],
                currPathEntry: [...action.data],
            };

        case ACTION_RESET_PATH:
            return {
                ...state,
                pathList: [...initialState.pathList],
                currPathEntry: initialState.currPathEntry,
            };

        default:
            return state;
    }
};

export default pathReducer
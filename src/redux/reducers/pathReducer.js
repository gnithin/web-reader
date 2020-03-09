import {ACTION_ADD_PATH, ACTION_RESET_PATH} from "../actions/pathActions";

const initialState = {
    pathList: []
};

const pathReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_ADD_PATH:
            return {
                ...state,
                pathList: [...state.pathList, action.data],
            };

        case ACTION_RESET_PATH:
            return {
                ...state,
                pathList: [...initialState.pathList],
            };

        default:
            return state;
    }
};

export default pathReducer
// NOTE: This does not do anything for now.
import {ACTION_ADD_CONTENT, ACTION_UPDATE_CONTENT} from "../actions/dataEntryActions";

let initialState = {
    contents: []
};

const dataEntryReducer = (state = initialState, action) => {
    console.log("DEBUG: DE Reducer called!")

    switch (action.type) {
        case ACTION_ADD_CONTENT:
            state.contents = [...state.contents, action.data];
            return {...state};

        case ACTION_UPDATE_CONTENT:
            state.contents = action.data;
            return {...state};

        default:
            return state;
    }
};

export default dataEntryReducer;

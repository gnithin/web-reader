// NOTE: This does not do anything for now.
import {
    ACTION_ADD_CONTENT,
    ACTION_DELETE_CONTENT,
    ACTION_UPDATE_CONTENT
} from "../actions/dataEntryActions";

let initialState = {
    contents: []
};

const dataEntryReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_ADD_CONTENT:
            state.contents = [...state.contents, action.data];
            return {...state};

        case ACTION_UPDATE_CONTENT:
            state.contents = action.data;
            return {...state};

        case ACTION_DELETE_CONTENT:
            let index = action.data;
            let newContents = [...state.contents];
            newContents.splice(index, 1);
            return {
                ...state,
                contents: newContents,
            };

        default:
            return state;
    }
};

export default dataEntryReducer;

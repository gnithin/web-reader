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
        case ACTION_ADD_CONTENT: {
            return {
                ...state,
                contents: [...state.contents, action.data]
            };
        }

        case ACTION_UPDATE_CONTENT: {
            let newContent = action.data.content;
            let index = action.data.index;
            state.contents[index] = newContent;
            return {
                ...state,
                contents: [...state.contents],
            };
        }

        case ACTION_DELETE_CONTENT: {
            let index = action.data;
            let newContents = [...state.contents];
            newContents.splice(index, 1);
            return {
                ...state,
                contents: newContents,
            };
        }

        default:
            return state;
    }
};

export default dataEntryReducer;

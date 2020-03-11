// NOTE: This does not do anything for now.
import {
    ACTION_ADD_CONTENT,
    ACTION_CF_ADD,
    ACTION_CF_UPDATE,
    ACTION_DELETE_CONTENT,
    ACTION_UPDATE_CONTENT
} from "../actions/dataEntryActions";
import Utils from "../../common/utils";

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

        case ACTION_CF_ADD: {
            let contents = [...state.contents];
            let content = contents[action.data.contentIndex];
            if (Utils.isNull(content.customFormatters)) {
                content.customFormatters = []
            }
            content.customFormatters.push(action.data.cfData);

            return {
                ...state,
                contents: contents
            };
        }

        case ACTION_CF_UPDATE: {
            let contents = [...state.contents];
            let content = contents[action.data.contentIndex];
            content.customFormatters[action.data.formatterIndex] = action.data.cfData;

            return {
                ...state,
                contents: contents,
            }
        }

        default:
            return state;
    }
};

export default dataEntryReducer;

// NOTE: This does not do anything for now.
import {
    ACTION_ADD_CONTENT,
    ACTION_CF_ADD,
    ACTION_CF_DELETE,
    ACTION_CF_UPDATE,
    ACTION_DELETE_CONTENT,
    ACTION_RESET_DATA_ENTRY,
    ACTION_SET_DATA_ENTRY,
    ACTION_SET_PARENT_ID,
    ACTION_SET_TAGS,
    ACTION_SET_TITLE,
    ACTION_UPDATE_CONTENT,
} from "../actions/dataEntryActions";
import Utils from "../../common/utils";

let initialState = {
    title: '',
    tags: '',
    contents: [],
    parentId: null,
    parent: null,
};

const dataEntryReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_SET_TITLE:
            return {
                ...state,
                title: action.data,
            };

        case ACTION_SET_TAGS:
            return {
                ...state,
                tags: action.data,
            };

        case ACTION_SET_PARENT_ID:
            return {
                ...state,
                parentId: action.data.parentId,
                parent: action.data.parent,
            };

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

        case ACTION_CF_DELETE: {
            let contents = [...state.contents];
            let content = contents[action.data.contentIndex];
            content.customFormatters.splice(action.data.formatterIndex, 1);
            content.customFormatters = [...content.customFormatters];

            return {
                ...state,
                contents: contents,
            }
        }

        case ACTION_SET_DATA_ENTRY: {
            return {
                ...action.data
            }
        }

        case ACTION_RESET_DATA_ENTRY: {
            return {
                ...initialState
            }
        }

        default:
            return state;
    }
};

export default dataEntryReducer;

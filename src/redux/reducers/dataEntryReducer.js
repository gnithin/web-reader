// NOTE: This does not do anything for now.
import {ACTION_UPDATE_CONTENT} from "../actions/dataEntryActions";

let initialState = {
    content: []
}

const dataEntryReducer = (state = initialState, action) => {
    console.log("DEBUG: DE Reducer called!")

    switch (action.type) {
        case ACTION_UPDATE_CONTENT:
            // something;
            break;
        default:
            return state;
    }
};

export default dataEntryReducer;

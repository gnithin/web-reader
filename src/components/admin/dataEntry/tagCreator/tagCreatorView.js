import React, {Component} from 'react';
import './tagCreator.css'
import {connect} from "react-redux";
import DataEntryActions from "../../../../redux/actions/dataEntryActions";

class TagCreatorView extends Component {
    render() {
        return (
            <input
                type="string"
                className="form-control"
                placeholder="Tags - Comma separated"
                value={this.props.tags}
                onChange={(e) => {
                    this.props.setTags(e.target.value);
                }}
            />
        );
    }
}

const reduxToStateMapper = (state) => {
    return {
        tags: state.dataEntry.tags,
    };
};

const stateToReduxMapper = (dispatcher) => {
    return {
        setTags: (tags) => {
            dispatcher(DataEntryActions.setTags(tags));
        },
    };
};

export default connect(reduxToStateMapper, stateToReduxMapper)(TagCreatorView);

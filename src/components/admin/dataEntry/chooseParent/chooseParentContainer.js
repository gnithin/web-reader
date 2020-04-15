import React, {Component} from 'react';
import ChooseParentView from "./ChooseParentView";
import DataEntryService from "../../../../services/dataEntryService";
import Utils from "../../../../common/utils";
import DataEntryActions from "../../../../redux/actions/dataEntryActions";
import {connect} from "react-redux";

class ChooseParentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: null,
        }
    }

    render() {
        return (
            <ChooseParentView
                selectedParent={this.props.parent}
                parentSelectedCb={this.parentSelectedHandler.bind(this)}
                searchTitleCb={this.searchTitle.bind(this)}
                results={this.state.results}
            />
        );
    }

    searchTitle(title) {
        DataEntryService.findParentForTitle(title).then(resp => {
            if (Utils.isNull(resp)) {
                console.log("CHOOSE_PARENT: Got an empty response!")
            }
            this.setState({results: resp});

        }).catch(err => {
            console.error("CHOOSE_PARENT: Error fetching data!");
            console.error(err);
        })
    }

    parentSelectedHandler(parentData) {
        if (Utils.isNull(parentData)) {
            return;
        }

        let id = parentData._id;
        console.log("Selected! - ", parentData);

        if (false === Utils.isNull(id)) {
            this.props.setParentId(parentData, id);
        } else {
            console.log("Choose-parent: Got empty parent-id")
        }
    }
}

const reduxToStateMapper = (state) => {
    return {
        parent: state.dataEntry.parent,
        parentId: state.dataEntry.parentId,
    };
};

const stateToReduxMapper = (dispatcher) => {
    return {
        setParentId: (parent, parentId) => {
            return dispatcher(DataEntryActions.setParentId(parent, parentId));
        }
    };
};

export default connect(reduxToStateMapper, stateToReduxMapper)(ChooseParentContainer);

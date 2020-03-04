import React, {Component} from 'react';
import PropTypes from 'prop-types'
import ChooseParentView from "./ChooseParentView";
import DataEntryService from "../../../../services/dataEntryService";
import Utils from "../../../../common/utils";

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
                parentSelectedCb={this.props.parentSelectedCb}
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
}

ChooseParentContainer.propType = {
    parentSelectedCb: PropTypes.func.isRequired,
};

export default ChooseParentContainer;
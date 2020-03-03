import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './dataEntry.css'
import Utils from "../../../common/utils";
import ChooseParent from "./chooseParent/chooseParentContainer";
import ContentCreator from "./contentCreator/contentCreatorContainer";
import {connect} from "react-redux";

class DataEntryView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.getStateFromProps(props),
        }
    }

    getStateFromProps(props) {
        return {
            title: props.title,
            parentId: null,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.title !== this.props.title) {
            this.setState(this.getStateFromProps(prevProps));
        }
    }

    render() {
        return (
            <div className="container-fluid data-entry-container">
                <div className="row da-input-entry da-heading">
                    <h3>Data Entry</h3>
                </div>

                {this.getInfo()}

                <div className="row da-input-entry no-gutters">
                    <div className="col-12">
                        <input
                            type="string"
                            id="title"
                            placeholder="Title"
                            className="form-control"
                            value={this.state.title}
                            onChange={(e) => {
                                this.setState({title: e.target.value});
                            }}
                        />
                    </div>
                </div>

                <div className="row da-input-entry">
                    <div className="col-12">
                        <ChooseParent
                            parentSelectedCb={this.parentSelectedHandler.bind(this)}
                        />
                    </div>
                </div>

                <div className="row da-input-entry no-gutters">
                    <div className="col-12">
                        <ContentCreator/>
                    </div>
                </div>

                <div className="row da-input-entry no-gutters">
                    <div className="col-12">
                        <button className="btn btn-primary" onClick={(e) => {
                            this.createDataEntry()
                        }}>
                            Add Entry
                        </button>
                    </div>
                </div>

            </div>
        );
    }

    getInfo() {
        if (Utils.isNull(this.props.info)) {
            return (<React.Fragment/>)
        }
        return (<div className="row da-input-entry da-input-info">
            <div>
                {this.props.info}
            </div>
        </div>);
    }

    createDataEntry() {
        let entries = {
            parentId: this.state.parentId,
            title: this.state.title,
            contents: this.props.contents,
        };
        this.props.addEntryCb(entries);
    }

    parentSelectedHandler(parentData) {
        if (Utils.isNull(parentData)) {
            this.setState({parentId: null});
            return;
        }

        let id = parentData._id;
        console.log("Selected! - ", parentData);
        if (false === Utils.isNull(id)) {
            this.setState({parentId: id});
        } else {
            console.log("Choose-parent: Got empty parent-id")
        }
    }
}

DataEntryView.propType = {
    addEntryCb: PropTypes.func.isRequired,
};

const reduxToStateMapper = (state) => {
    return {
        contents: state.dataEntry.contents,
    }
};

export default connect(reduxToStateMapper, null)(DataEntryView);

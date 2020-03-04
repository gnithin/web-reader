import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './dataEntry.css'
import Utils from "../../../common/utils";
import ChooseParent from "./chooseParent/chooseParentContainer";
import ContentCreator from "./contentCreator/contentCreatorContainer";
import {connect} from "react-redux";
import TagCreatorView from "./tagCreator/tagCreatorView";
import CONSTANTS from "../../../common/constants";

class DataEntryView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.getStateFromProps(props),
            tags: null,
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
                    <h2>Data Entry Dashboard</h2>
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
                        <TagCreatorView
                            updateTagsCb={(tags) => {
                                this.setState({tags: tags})
                            }}
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

        let status = "primary";
        if (false === Utils.isNull(this.props.infoType)) {
            switch (this.props.infoType) {
                case CONSTANTS.DATA_INFO.SUCCESS:
                    status = "success";
                    break;
                case CONSTANTS.DATA_INFO.ERROR:
                    status = "danger";
                    break;
                default:
                // pass
            }
        }

        return (<div className="row da-input-entry da-input-info">
            <div className={`alert alert-${status}`}>
                {this.props.info}
            </div>
        </div>);
    }

    createDataEntry() {
        let entries = {
            parentId: this.state.parentId,
            title: this.state.title,
            contents: this.props.contents,
            tags: this.processTags(this.state.tags),
        };
        entries.type = this.getTypeFromContents(entries.contents);
        this.props.addEntryCb(entries);
    }

    getTypeFromContents(contents) {
        let isImg = false;
        if (false === Utils.isNull(contents)) {
            for (let c of contents) {
                if (false === Utils.isEmptyStr(c.imgLink)) {
                    isImg = true;
                    break;
                }
            }
        }

        if (isImg) {
            return CONSTANTS.TYPES.PARA_AND_IMG;
        } else {
            return CONSTANTS.TYPES.PARA;
        }
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

    processTags() {
        let resultTags = [];
        if (Utils.isNull(this.state.tags)) {
            return resultTags;
        }
        let components = this.state.tags.split(",");
        for (let c of components) {
            resultTags.push(c.trim());
        }
        return resultTags.filter((e) => {
            return e !== ""
        });
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

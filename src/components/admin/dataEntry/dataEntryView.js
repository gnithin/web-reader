import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './dataEntry.css'
import Utils from "../../../common/utils";
import ChooseParent from "./chooseParent/chooseParentContainer";
import ContentCreator from "./contentCreator/contentCreatorContainer";
import {connect} from "react-redux";
import TagCreatorView from "./tagCreator/tagCreatorView";
import Preview from './preview'
import CONSTANTS from "../../../common/constants";

class DataEntryView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            tags: null,
            parentId: null,
            showPreview: true,
        }
    }

    render() {
        return (
            <div className="container-fluid data-entry-container">
                <div className="row da-input-entry da-heading no-gutters">
                    <h2 className="col-12 col-sm-8">Document Entry Dashboard</h2>
                    <div className="col-12 col-sm-4 preview-form-wrapper">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="show-preview"
                                checked={this.state.showPreview}
                                onChange={(e) => {
                                    this.setState({showPreview: e.target.checked});
                                }}
                            />
                            <label className="form-check-label" htmlFor="show-preview">
                                Show Preview
                            </label>
                        </div>

                    </div>
                </div>

                {this.getInfo()}
                <div className="row no-gutters all-content-wrapper">
                    {this.renderAdminForms()}
                    {this.renderPreview()}
                </div>
            </div>
        );
    }

    renderPreview() {
        if (false === this.state.showPreview) {
            return (<React.Fragment/>);
        }

        return (
            <div className="col-12 col-md-6 admin-content preview-content-wrapper">
                <div className="row da-input-entry no-gutters">
                    <div className="col-12">
                        <Preview
                            dataEntry={this.getDataEntry()}
                        />
                    </div>
                </div>
            </div>
        );
    }

    renderAdminForms() {
        let wrapperClasses = "col-12 col-md-12 admin-content";
        if (this.state.showPreview) {
            wrapperClasses = "col-12 col-md-6 admin-content";
        }

        return (
            <div className={wrapperClasses}>
                <div className="row da-input-entry no-gutters">
                    <div className="col-12">
                        <input
                            type="string"
                            id="title"
                            placeholder="Document Title"
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
                            Submit Entry
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
        this.props.addEntryCb(this.getDataEntry());
    }

    getDataEntry() {
        return {
            parentId: this.state.parentId,
            title: this.state.title,
            contents: this.props.contents,
            tags: this.processTags(this.state.tags),
        };
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

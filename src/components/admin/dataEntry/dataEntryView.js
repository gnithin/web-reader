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
import DataEntryActions from "../../../redux/actions/dataEntryActions";
import {Link, withRouter} from "react-router-dom";

class DataEntryView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPreview: true,
        }
    }

    componentDidMount() {
        this.populateData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.match.params !== this.props.match.params &&
            prevProps.match.params.id !== this.props.match.params.id
        ) {
            this.populateData();
        }
    }

    populateData() {
        if (Utils.isNull(this.props.match.params.id)) {
            this.props.resetAdminData();
            return;
        }

        // TODO: Fetch data!
    }

    renderAddNewEntry() {
        console.log("DEBUG: ", this.props.match.params.id);
        if (Utils.isNull(this.props.match.params.id)) {
            return (<React.Fragment/>)
        }

        return (
            <div className="add-new-entry">
                <Link to='/admin/pages'>Add New Entry</Link>
            </div>
        );
    }

    render() {
        return (
            <div className="container-fluid data-entry-container">
                <div className="row da-input-entry da-heading no-gutters">
                    <h2 className="col-12 col-sm-8">Document Entry Dashboard</h2>
                    <div className="col-12 col-sm-4 preview-form-wrapper">
                        {this.renderAddNewEntry()}
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
                            value={this.props.title}
                            onChange={(e) => {
                                this.props.setTitle(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="row da-input-entry">
                    <div className="col-12">
                        <ChooseParent/>
                    </div>
                </div>

                <div className="row da-input-entry no-gutters">
                    <div className="col-12">
                        <TagCreatorView/>
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
                {this.props.info} {this.renderInfoLink()}
            </div>
        </div>);
    }

    renderInfoLink() {
        if (Utils.isEmptyStr(this.props.infoLink)) {
            return (<React.Fragment/>);
        }
        return (
            <React.Fragment>
                <a
                    href={this.props.infoLink}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Link
                </a>
            </React.Fragment>
        )
    }

    createDataEntry() {
        this.props.addEntryCb(this.getDataEntry());
    }

    getDataEntry() {
        return {
            parentId: this.props.parentId,
            title: this.props.title,
            contents: this.props.contents,
            tags: this.processTags(this.props.tags),
        };
    }

    processTags(tags) {
        let resultTags = [];
        if (Utils.isNull(tags)) {
            return resultTags;
        }
        let components = tags.split(",");
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
        title: state.dataEntry.title,
        tags: state.dataEntry.tags,
        parentId: state.dataEntry.parentId,
    }
};

const stateToReduxMapper = (dispatcher) => {
    return {
        setTitle: (title) => {
            dispatcher(DataEntryActions.setTitle(title));
        },

        resetAdminData: () => {
            console.log("Resetting!");
            dispatcher(DataEntryActions.resetAdminData());
        }
    };
};

export default withRouter(connect(reduxToStateMapper, stateToReduxMapper)(DataEntryView))

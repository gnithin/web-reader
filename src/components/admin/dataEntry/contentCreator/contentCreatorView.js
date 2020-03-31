import React, {Component} from 'react';
import './contentCreator.css'
import Utils from "../../../../common/utils";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import DataEntryActions from "../../../../redux/actions/dataEntryActions";
import CustomFormatters from "../customFormatters";

class ContentCreatorView extends Component {
    constructor(props) {
        super(props);
        this.state = this.getStateForProps(props);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let prevContents = prevProps.contents;
        let currContents = this.props.contents;
        let prevContent = prevContents[prevProps.contentIndex];
        let currContent = currContents[this.props.contentIndex];

        if (
            prevProps.contentIndex !== this.props.contentIndex ||
            prevContent !== currContent ||
            prevContent.title !== currContent.title ||
            prevContent.description !== currContent.description ||
            prevContent.imageURL !== currContent.imageURL ||
            prevContent.alignment !== currContent.alignment
        ) {
            this.setState(this.getStateForProps(this.props));
        }
    }

    getStateForProps(props) {
        let content = props.contents[props.contentIndex];
        return {
            title: content.title,
            description: content.description,
            imageURL: content.imageURL,
            alignment: content.alignment,
        }
    }

    render() {
        return (
            <div className="content-creator-container row">
                <div className="col-12 content-input content-input-top-bar">
                    <span className="content-heading">
                        Create content
                    </span>
                    <span className="content-close">
                        <i
                            className="fa fa-times"
                            aria-hidden="true"
                            onClick={(_) => {
                                this.props.deleteContentsForIndex(this.props.contentIndex);
                            }}
                        />
                    </span>
                </div>

                <div className="col-12 content-input">
                    <input
                        type="string"
                        value={this.state.title}
                        className="form-control"
                        placeholder="Title"
                        onChange={(e) => {
                            this.setState(
                                {
                                    title: e.target.value,
                                },
                                () => {
                                    this.updateContainer();
                                }
                            );
                        }}
                        autoFocus={true}
                    />
                </div>

                <div className="col-12 content-input">
                    <textarea
                        value={this.state.description}
                        className="form-control"
                        placeholder="Enter content description here"
                        onChange={(e) => {
                            return this.setState(
                                {
                                    description: e.target.value,
                                },
                                () => {
                                    this.updateContainer();
                                }
                            );
                        }}
                    />
                </div>

                <div className="col-12 content-input">
                    <input
                        type="string"
                        value={this.state.imageURL}
                        className="form-control"
                        placeholder="Enter image link here"
                        onChange={(e) => {
                            this.setState(
                                {
                                    imageURL: e.target.value,
                                },
                                () => {
                                    this.updateContainer();
                                });
                        }}
                    />
                </div>

                {this.displayAlignment()}

                <div className="col-12 content-input">
                    <CustomFormatters
                        contentIndex={this.props.contentIndex}
                    />
                </div>
            </div>
        );
    }

    updateContainer() {
        this.updateAlignment();
        this.props.updateContentsForIndex(this.getContentFromState(), this.props.contentIndex);
    }

    getContentFromState() {
        let currContents = this.props.contents;
        let currContent = currContents[this.props.contentIndex];

        // Copy all the state entries onto the curr-content object
        for (let k in this.state) {
            if (!this.state.hasOwnProperty(k)) {
                continue
            }
            currContent[k] = this.state[k];
        }
        currContent.assignType();
        return currContent;
    }

    updateAlignment() {
        if ((Utils.isEmptyStr(this.state.description) || Utils.isEmptyStr(this.state.imageURL))) {
            if (false === Utils.isEmptyStr(this.state.alignment)) {
                this.setState({alignment: ""});
            }
        }
    }

    displayAlignment() {
        if (Utils.isEmptyStr(this.state.description) || Utils.isEmptyStr(this.state.imageURL)) {
            return (<React.Fragment/>);
        }

        return (
            <div className="col-12 content-input">
                <select
                    value={this.state.alignment}
                    onChange={(e) => {
                        this.setState(
                            {alignment: e.target.value},
                            () => {
                                this.updateContainer();
                            }
                        )
                    }}
                >
                    <option disabled value="">Select Alignment</option>
                    <option value="right">Right Align</option>
                    <option value="left">Left Align</option>
                </select>
            </div>
        );

    }
}

ContentCreatorView.propType = {
    contentIndex: PropTypes.number.isRequired,
};

const reduxToPropsMapper = (state) => {
    return {
        contents: state.dataEntry.contents
    }
};

const componentToReduxMapper = (dispatcher) => {
    return {
        updateContentsForIndex: (content, contentIndex) => {
            dispatcher(DataEntryActions.updateContentsForIndex(content, contentIndex));
        },

        deleteContentsForIndex: (index) => {
            dispatcher(DataEntryActions.deleteContentIndex(index));
        }
    };
};

export default connect(reduxToPropsMapper, componentToReduxMapper)(ContentCreatorView);

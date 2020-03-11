import React, {Component} from 'react';
import ContentCreatorView from "./contentCreatorView";
import {connect} from "react-redux";
import './contentCreator.css'
import Utils from "../../../../common/utils";
import DataEntryActions from "../../../../redux/actions/dataEntryActions";
import Content from "../../../../models/content";

class ContentCreatorContainer extends Component {
    render() {
        return (
            <div className="content-creator-list-container">
                {this.getContents()}

                <div className="add-new-content-btn row no-gutters">
                    {
                        (Utils.isNull(this.props.contents) || this.props.contents.length === 0) &&
                        <span className="add-new-content-message">Click here to add contents </span>
                    }
                    <button className="btn btn-primary" onClick={(e) => {
                        this.addNewContent()
                    }}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        );
    }

    getContents() {
        if (Utils.isNull(this.props.contents)) {
            return (
                <React.Fragment/>
            );
        }

        return (
            this.props.contents.map((content, i) => {
                return (
                    <ContentCreatorView
                        key={`content-creator-${i}`}
                        contentIndex={i}
                    />
                );
            })
        );
    }

    addNewContent() {
        this.props.addContent(
            new Content({})
        );
    }
}

const reduxToPropsMapper = (state) => {
    return {
        contents: state.dataEntry.contents
    }
};

const componentToReduxMapper = (dispatcher) => {
    return {
        addContent: (content) => {
            dispatcher(DataEntryActions.addContent(content));
        },
    };
};

export default connect(reduxToPropsMapper, componentToReduxMapper)(ContentCreatorContainer);
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
                    }}>+
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
                        updateContentCb={(data) => {
                            this.updateData(data, i)
                        }}
                        deleteContentCb={() => {
                            this.props.deleteContents(i)
                        }}
                        title={content.title}
                        description={content.description}
                        imgLink={content.imgLink}
                        alignment={content.alignment}
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

    updateData(newData, index) {
        // Update the data at the location
        let newContents = [...this.props.contents];
        newContents[index] = new Content(newData);
        this.props.updateContents(newContents);
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

        updateContents: (contents) => {
            dispatcher(DataEntryActions.updateContents(contents));
        },

        deleteContents: (index) => {
            dispatcher(DataEntryActions.deleteContentIndex(index));
        }
    };
};

export default connect(reduxToPropsMapper, componentToReduxMapper)(ContentCreatorContainer);
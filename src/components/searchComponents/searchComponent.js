import React, {Component} from 'react';
import {WithContext as ReactTags} from 'react-tag-input';
import {connect} from "react-redux";
import './style.css';
import searchActions from "../../redux/actions/searchActions";
import Utils from "../../common/utils";

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class SearchComponent extends Component {
    handleAddition(reactTagsTag) {
        this.props.addSearchTag(this.getTagFromReactTag(reactTagsTag));
    }

    handleDelete(i) {
        this.props.deleteTagByIndex(i);
    }

    render() {
        console.log("DEBUG: tags - ", this.props.tags);
        console.log("DEBUG: suggestions - ", this.props.suggestions);

        let tags = this.transformListForReactTags(this.props.tags);
        let suggestions = this.transformListForReactTags(this.props.suggestions);

        return (
            <div className="px-md-2">
                <ReactTags
                    tags={tags}
                    inputFieldPosition='top'
                    suggestions={suggestions}
                    handleAddition={this.handleAddition.bind(this)}
                    handleDelete={this.handleDelete.bind(this)}
                    allowDragDrop={false}
                    minQueryLength={1}
                    delimiters={delimiters}
                />
            </div>
        )
    }

    transformListForReactTags(tags) {
        if (Utils.isNull(tags)) {
            return [];
        }

        let newTags = [];
        for (let t of tags) {
            newTags.push({
                             id: t,
                             text: t,
                         })
        }
        return newTags;
    }

    getTagFromReactTag(reactTag) {
        return reactTag.text;
    }
}

const reduxToComponentMapper = (state) => {
    return {
        tags: state.search.tags,
        suggestions: state.article.data.tags,
    }
};

const componentToReduxMapper = (dispatcher) => {
    return {
        addSearchTag: (newTag) => {
            dispatcher(searchActions.addSearchTag(newTag));
        },
        deleteTagByIndex: (tagIndex) => {
            dispatcher(searchActions.deleteSearchTagByIndex(tagIndex))
        }
    }
};

export default connect(reduxToComponentMapper, componentToReduxMapper)(SearchComponent);

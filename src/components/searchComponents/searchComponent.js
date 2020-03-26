import React, {Component} from 'react';
import {WithContext as ReactTags} from 'react-tag-input';
import {connect} from "react-redux";
import './style.css';
import Utils from "../../common/utils";
import searchActions from "../../redux/actions/searchActions";

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class SearchComponent extends Component {
    constructor(props) {
        super(props);

        this.handleAddition = this.handleAddition.bind(this);
        // this.handleDelete = this.handleDelete.bind(this);
        // this.handleDrag = this.handleDrag.bind(this);
    }

    handleAddition(reactTagsTag) {
        let tag = reactTagsTag.text;
        this.props.addSearchTag(tag);
    }

    // handleDelete(i) {
    //     const { tags } = this.state;
    //     this.setState({
    //      tags: tags.filter((tag, index) => index !== i),
    //     });
    //     const newTags = this.state.tags.filter((tag, index) => index !== i);
    //     ArticleDataSource.fetchDataSourceForTags(newTags).then((data) => {
    //         console.log("Got data");
    //         console.log(data);
    //
    //         this.setState({ tags: newTags });
    //         // this.props.addArticle(data);
    //
    //     }).catch(err => {
    //         console.error("Error fetching data from server - ", err)
    //     })
    // }
    // handleDrag(tag, currPos, newPos) {
    //     const tags = [...this.state.tags];
    //     const newTags = tags.slice();
    //
    //     newTags.splice(currPos, 1);
    //     newTags.splice(newPos, 0, tag);
    //
    //     ArticleDataSource.fetchDataSourceForTags(newTags).then((data) => {
    //         console.log("Got data");
    //         console.log(data);
    //
    //         this.setState({ tags: newTags });
    //         // this.props.addArticle(data);
    //
    //     }).catch(err => {
    //         console.error("Error fetching data from server - ", err)
    //     })
    // }

    render() {
        console.log("DEBUG: tags - ", this.props.tags);
        let tags = this.transformListForReactTags(this.props.tags);
        let suggestions = this.transformListForReactTags(this.props.suggestions);

        return (
            <div className="px-md-2">
                <ReactTags
                    tags={tags}
                    inputFieldPosition='top'
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    minQueryLength={1}
                    delimiters={delimiters}
                />
            </div>
        )
    }

    transformListForReactTags(tags) {
        let newTags = [];
        for (let t of tags) {
            newTags.push({
                             id: t,
                             text: t,
                         })
        }
        return newTags;
    }
}

const reduxToComponentMapper = (state) => {
    let localSuggestion = [];
    if (!Utils.isNull(state.article.data.tags)) {
        localSuggestion = state.article.data.tags.map((val) => {
            return {id: val, text: val}
        })
    }

    return {
        tags: state.search.tags,
        suggestions: localSuggestion,
    }
};

const componentToReduxMapper = (dispatcher) => {
    return {
        addSearchTag: (newTag) => {
            dispatcher(searchActions.addSearchTag(newTag));
        }
    }
};

export default connect(reduxToComponentMapper, componentToReduxMapper)(SearchComponent);

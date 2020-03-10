import React, { Component } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import {connect} from "react-redux";
import ArticleActions from "../../redux/actions/articleActions";
import './style.css';
import Utils from 'common/utils';
import ArticleDataSource from 'services/articleService';

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class SearchComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            suggestions: props.suggestions,
            currentPageId: props.pageId
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
        const newTags = this.state.tags.filter((tag, index) => index !== i);
        ArticleDataSource.fetchDataSourceForTags(newTags).then((data) => {
            console.log("Got data");
            console.log(data);

            this.setState({ tags: newTags });
            // this.props.addArticle(data);

        }).catch(err => {
            console.error("Error fetching data from server - ", err)
        })   
    }
 
    handleAddition(tag) {
        const newTags = [...this.state.tags, tag];
        ArticleDataSource.fetchDataSourceForTags(newTags).then((data) => {
            console.log("Got data");
            console.log(data);

            this.setState({ tags: newTags });
            // this.props.addArticle(data);

        }).catch(err => {
            console.error("Error fetching data from server - ", err)
        })   
    }
 
    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
 
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
 
        ArticleDataSource.fetchDataSourceForTags(newTags).then((data) => {
            console.log("Got data");
            console.log(data);

            this.setState({ tags: newTags });
            // this.props.addArticle(data);

        }).catch(err => {
            console.error("Error fetching data from server - ", err)
        })   
    }
 
    render() {
        console.log("DEBUG" , this.props.suggestions);

        
        return (
            <div className="px-md-2">
                <ReactTags tags={this.state.tags}
                    key={(new Date()).getTime() +  ''}
                    inputFieldPosition='top'
                    suggestions={this.props.suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    minQueryLength={1}
                    delimiters={delimiters} />
            </div>
        )
    }
}

const componentToReduxMapper = (dispatcher) => {
    return {
        addArticle: (article) => {
            dispatcher(ArticleActions.addArticleData(article));
        }
    }
};

const reduxToComponentMapper = (state) => {
    let localSuggestion = []
    if (!Utils.isNull(state.article.data.tags))
        localSuggestion = state.article.data.tags.map((val) => {return {id: val, text: val}})

    return {
        suggestions: localSuggestion,
    }
};

export default connect(reduxToComponentMapper, componentToReduxMapper)(SearchComponent);
import React, { Component } from 'react';
import {connect} from "react-redux";
import Utils from 'common/utils';
import SearchComponent from './searchComponent';
import SearchResults from './searchResults';

class SearchContainer extends Component {
    componentWillMount() {
        this.query = new URLSearchParams(useLocation().search);
        this.fetchContentForTags()
    }

    fetchContentForTags() {
        ArticleDataSource.fetchDataSourceForTags(this.props.tags.toString()).then((data) => {
            console.log("Got data");
            console.log(data);

            // this.props.addArticle(data);

        }).catch(err => {
            console.error("Error fetching data from server - ", err)
        })  
    }

    render() {
        return (
            <div>
                <SearchComponent tags={this.props.tags} suggestions={this.props.suggestions} />
                <SearchResults tagString={this.props.tags.toString()}/>
            </div>
        )
    }
}

const componentToReduxMapper = (dispatcher) => {

}

const reduxToComponentMapper = (state) => {
    let localSuggestion = []
    if (!Utils.isNull(state.article.data.tags))
        localSuggestion = state.article.data.tags.map((val) => {return {id: val, text: val}})

    return {
        tags: state.tags,
        suggestions: localSuggestion,
    }
}

export default connect(reduxToComponentMapper, componentToReduxMapper)(SearchContainer);
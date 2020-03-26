import React, {Component} from 'react';
import {connect} from "react-redux";
import SearchComponent from './searchComponent';
import ArticleDataSource from "../../services/articleService";
import SearchActions from "../../redux/actions/searchActions";
import Utils from "../../common/utils";

class SearchContainer extends Component {
    componentDidMount() {
        this.query = new URLSearchParams(this.props.location.search);
        const searchQuery = this.query.get("title");
        this.props.addSearchTags([searchQuery]);
        this.fetchContentForTags();
    }

    fetchContentForTags() {
        console.log(this.props.tags);
        ArticleDataSource.fetchDataSourceForTags(this.props.tags).then((data) => {
            console.log("Got data");
            console.log(data);

            this.props.setSearchData(data);

        }).catch(err => {
            console.error("Error fetching data from server - ", err)
        })
    }

    render() {
        return (
            <div>
                <SearchComponent tags={this.props.tags} suggestions={this.props.suggestions}/>
                {/*<SearchResults data={this.props.data} searchQuery={this.query.get("title")}/>*/}
            </div>
        )
    }
}

const componentToReduxMapper = (dispatcher) => {
    return {
        setSearchData: (data) => {
            dispatcher(SearchActions.updateSearchData(data));
        },
        addSearchTags: (tags) => {
            dispatcher(SearchActions.addSearchTags(tags));
        }
    }
}

const reduxToComponentMapper = (state) => {
    let localSuggestion = []
    if (!Utils.isNull(state.article.data.tags)) {
        localSuggestion = state.article.data.tags.map((val) => {
            return {id: val, text: val}
        })
    }

    return {
        searchData: Object.values(state.search.data),
        tags: state.search.tags,
        suggestions: localSuggestion,
    }
}

export default connect(reduxToComponentMapper, componentToReduxMapper)(SearchContainer);

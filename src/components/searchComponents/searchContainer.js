import React, {Component} from 'react';
import {connect} from "react-redux";
import SearchComponent from './searchComponent';
import SearchActions from "../../redux/actions/searchActions";
import Utils from "../../common/utils";
import TagService from "../../services/tagService";

class SearchContainer extends Component {
    componentDidMount() {
        let query = new URLSearchParams(this.props.location.search);
        const searchQuery = query.get("title");
        if (false === Utils.isNull(searchQuery)) {
            this.props.setSearchTags([searchQuery])
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.tags !== prevProps.tags) {
            // TODO: update the url
            this.fetchContentForTags()
        }
    }

    fetchContentForTags() {
        TagService.fetchDataSourceForTags(this.props.tags)
            .then((results) => {
                console.log("Search results - ", results);
                this.props.setSearchResults(results);

            })
            .catch(err => {
                console.error("Error fetching data from server - ", err)
            })
    }

    render() {
        return (
            <div>
                <SearchComponent/>
                {/*<SearchResults data={this.props.data} searchQuery={this.query.get("title")}/>*/}
            </div>
        )
    }
}

const reduxToComponentMapper = (state) => {
    return {
        tags: state.search.tags,
    }
};

const componentToReduxMapper = (dispatcher) => {
    return {
        setSearchTags: (tags) => {
            dispatcher(SearchActions.setSearchTags(tags));
        },

        setSearchResults: (results) => {
            dispatcher(SearchActions.setSearchResults(results))
        }

        // addSearchTags: (tags) => {
        //     dispatcher(SearchActions.addSearchTags(tags));
        // }
    }
};

export default connect(reduxToComponentMapper, componentToReduxMapper)(SearchContainer);

import React, {Component} from 'react';
import {connect} from "react-redux";
import SearchComponent from './searchComponent';
import SearchActions from "../../redux/actions/searchActions";
import Utils from "../../common/utils";

class SearchContainer extends Component {
    componentDidMount() {
        let query = new URLSearchParams(this.props.location.search);
        const searchQuery = query.get("title");
        if (false === Utils.isNull(searchQuery)) {
            this.props.setSearchTags([searchQuery])
        }
    }

    //
    // fetchContentForTags() {
    //     console.log(this.props.tags);
    //     TagService.fetchDataSourceForTags(this.props.tags).then((data) => {
    //         console.log("Got data");
    //         console.log(data);
    //
    //         this.props.setSearchData(data);
    //
    //     }).catch(err => {
    //         console.error("Error fetching data from server - ", err)
    //     })
    // }

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
        // searchData: Object.values(state.search.data),
        tags: state.search.tags,
    }
};

const componentToReduxMapper = (dispatcher) => {
    return {
        setSearchTags: (data) => {
            dispatcher(SearchActions.setSearchTags(data));
        },

        // addSearchTags: (tags) => {
        //     dispatcher(SearchActions.addSearchTags(tags));
        // }
    }
};

export default connect(reduxToComponentMapper, componentToReduxMapper)(SearchContainer);

import React, {Component} from 'react';
import {connect} from "react-redux";
import SearchComponent from './searchComponent';
import SearchResults from './searchResults';
import SearchActions from "../../redux/actions/searchActions";
import Utils from "../../common/utils";
import TagService from "../../services/tagService";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import './searchStyle.css'

const SEARCH_PARAM = "title";

class SearchContainer extends Component {
    componentDidMount() {
        let query = new URLSearchParams(this.props.location.search);
        const searchQuery = query.get(SEARCH_PARAM);
        if (false === Utils.isEmptyStr(searchQuery)) {
            this.props.setSearchTags(this.getTagsListFromTags(searchQuery))
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.tags !== prevProps.tags) {
            this.updateUrlWithTags();
            this.fetchContentForTags()
        }
    }

    updateUrlWithTags() {
        let tags = this.getTagsFromTagsList(this.props.tags);
        window.history.pushState({}, "", `?${SEARCH_PARAM}=${tags}`)
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
            <div className="container-fluid">
                {this.renderTopBar()}
                <SearchComponent/>
                <SearchResults/>
            </div>
        )
    }

    renderTopBar() {
        return (
            <div className="row results-top-bar">
                <div className="col results-top-bar-contents">
                    <Link to="/reader">
                        <Button variant="light">
                            <FontAwesomeIcon icon={faHome}/>
                        </Button>
                    </Link>
                    <div className="results-title">Search Tags</div>
                </div>
            </div>
        );
    }

    getTagsListFromTags(tags) {
        return tags.split(",").map(t => {
            return t.trim()
        })
    }

    getTagsFromTagsList(tagsList) {
        return tagsList.join(",")
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
    }
};

export default connect(reduxToComponentMapper, componentToReduxMapper)(SearchContainer);

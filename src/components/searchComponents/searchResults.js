import React, {Component} from 'react';
import {connect} from "react-redux";
import Utils from "../../common/utils";
import './searchResultsStyle.css'
import {Link} from "react-router-dom";

const WORD_LIMIT = 400;

class SearchResults extends Component {
    render() {
        if (Utils.isNull(this.props.results) || this.props.results.length === 0) {
            return (
                <div>
                </div>
            );
        }

        return (
            <div>
                {
                    this.props.results.map((result, i) => {
                        return (
                            <div className="card result-container"
                                 key={`result-key-${i}`}
                                 onClick={(e) => {
                                     // Go to /reader/<id>
                                 }}
                            >
                                <div className="card-body">
                                    <h3 className="card-title result-title">
                                        <Link to={`/reader/${result._id}`}>
                                            {result.title}
                                        </Link>
                                    </h3>
                                    <p className="card-text">
                                        {this.getContentsForCard(result.contents)}
                                    </p>
                                    <div className="card-text">
                                        Tags:
                                        <span className="result-tags">
                                            {this.getTagsForCard(result.tags)}
                                        </span>
                                    </div>
                                    {/*<a href="#" className="btn btn-primary">Go somewhere</a>*/}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    getTagsForCard(tagsList) {
        if (Utils.isNull(tagsList) || tagsList.length === 0) {
            return "";
        }
        return tagsList.join(", ");
    }

    getContentsForCard(contentsList) {
        if (Utils.isNull(contentsList) || contentsList.length === 0) {
            return "";
        }

        let displayContentsList = contentsList.map(content => {
            return ((Utils.isNull(content.description)) ? "" : content.description);
        });

        let displayContents = displayContentsList.join(" ");
        if (displayContents.length > WORD_LIMIT) {
            displayContents = displayContents.substring(0, WORD_LIMIT) + "...";
        }
        return displayContents;
    }

}

const reduxToComponentMapper = (state) => {
    return {
        results: state.search.searchResults,
    }
};

export default connect(reduxToComponentMapper)(SearchResults);

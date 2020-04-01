import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import Utils from "../../common/utils";
import './readerOptions.css'
import ArticlesListActions from "../../redux/actions/articlesListActions";

class ReaderOptionsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ""
        }
    }

    render() {
        if (Utils.isNull(this.props.articlesList)) {
            return (
                <div>No items to display here.</div>
            );
        }

        return (
            <div className="container-fluid options-wrapper">

                <div className="row search-box-wrapper no-gutters">
                    <div className="offset-1 offset-md-3 col-9 col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.searchText}
                            onChange={(e) => {
                                this.setState({
                                                  searchText: e.target.value
                                              });
                            }}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    this.submitQuery()
                                }
                            }}
                            placeholder="Search document tags here..."
                        />
                    </div>
                    <div className="col-1">
                        <button className="btn btn-primary" onClick={(e) => {
                            this.submitQuery()
                        }}>
                            <i className="fa fa-arrow-right" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>

                <div className="row options-title-wrapper">
                    <div className="col-12 options-content">
                        <h2>Choose Visa Type</h2>
                    </div>
                </div>

                <div className="row options-content-wrapper">
                    <div className="col-12 options-content">
                        <div className="list-group options-list">
                            {
                                this.props.articlesList.map((article, i) => {
                                    return (
                                        <Link
                                            key={`article-list-item-${i}`}
                                            className="list-group-item"
                                            to={`/reader/${article._id}`}
                                            onClick={() => {
                                                this.props.selectFromArticlesList(i)
                                            }}
                                        >
                                            {article.title}
                                        </Link>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    submitQuery() {
        if (Utils.isEmptyStr(this.state.searchText)) {
            console.log("Not doing anything since the search string is empty")
        }

        this.props.history.push(`/search?title=${this.state.searchText}`);
    }
}

const reduxToComponentMapper = (state) => {
    return {
        articlesList: state.articlesList.data,
    }
};

const componentToReduxMapper = (dispatcher) => {
    return {
        selectFromArticlesList: (index) => {
            dispatcher(ArticlesListActions.selectFromArticlesList(index));
        }
    }
};

export default connect(reduxToComponentMapper, componentToReduxMapper)(
    withRouter(ReaderOptionsView));

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Utils from "../../common/utils";
import './readerOptions.css'
import ArticlesListActions from "../../redux/actions/articlesListActions";

class ReaderOptionsView extends Component {
    render() {
        if (Utils.isNull(this.props.articlesList)) {
            return (
                <div>No items to display here.</div>
            );
        }

        return (
            <div className="container-fluid options-wrapper">
                <div className="row">
                    <div className="col-12 options-content">
                        <h2>Choose your title</h2>

                    </div>
                </div>

                <div className="row">
                    <div className="offset-3 col-6 options-content">
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

export default connect(reduxToComponentMapper, componentToReduxMapper)(ReaderOptionsView);
import React, {Component} from 'react'
import './article.css'
import Utils from 'common/utils'
import {connect} from "react-redux";

class ArticleContainer extends Component {
    render() {
        let article = this.props.article;

        if (Utils.isEmptyObject(article)) {
            return (
                <div>No data to be seen here</div>
            );
        }

        // TODO: Parse different kinds of components

        return (
            <React.Fragment>
                <h1 className="article-title">
                    {article.title}
                </h1>
            </React.Fragment>
        )
    }
}

const reduxToComponentMapper = (state) => {
    return {
        article: state.article.data,
    }
};

export default connect(reduxToComponentMapper, null)(ArticleContainer)
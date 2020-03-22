import React, {Component} from 'react'
import './article.css'
import Utils from 'common/utils'
import {connect} from "react-redux";
import ArticleView from "./articleView";

class ArticleContainer extends Component {
    render() {
        let article = this.props.article;
        if (Utils.isEmptyObject(article)) {
            return (
                <div>No data to be seen here</div>
            );
        }

        return (
            <ArticleView
                article={article}
            />
        )
    }
}

const reduxToComponentMapper = (state) => {
    return {
        article: state.article.data,
    }
};

export default connect(reduxToComponentMapper, null)(ArticleContainer)

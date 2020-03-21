import React, {Component} from 'react'
import './article.css'
import Utils from 'common/utils'
import {connect} from "react-redux";
import ArticleContentTypeContainer from "../readerComponents/articleContentTypeContainer";

class ArticleContainer extends Component {
    render() {
        let article = this.props.article;

        if (Utils.isEmptyObject(article)) {
            return (
                <div>No data to be seen here</div>
            );
        }

        return (
            <React.Fragment>
                <h1 className="article-title">
                    {article.title}
                </h1>
                <div className="article-contents-container">
                    {article.contents.map((content, i) => {
                        return (
                            <ArticleContentTypeContainer
                                key={`content-${i}`}
                                content={content}
                            />
                        );
                    })}
                </div>
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

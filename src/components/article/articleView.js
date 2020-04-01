import React, {Component} from 'react';
import ArticleContentTypeContainer from "../readerComponents/articleContentTypeContainer";
import PropTypes from 'prop-types'
import Utils from "../../common/utils";

class ArticleView extends Component {
    render() {
        let article = this.props.article;
        return (
            <React.Fragment>
                <h1 className="article-title">
                    {article.title}
                </h1>
                {this.renderTags(article)}
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
        );
    }

    renderTags(article) {
        if (Utils.isNull(article.tags) || article.tags.length === 0) {
            return (<React.Fragment/>);
        }

        return (
            <div className="tags-container">
                Tags: &nbsp;
                {article.tags.map((tag, i) => {
                    return (
                        <React.Fragment key={`tag-${i}`}>
                            <button className="btn btn-primary tag-btn" disabled={true}>
                                {tag}
                            </button>
                            &nbsp;
                        </React.Fragment>
                    );
                })}
            </div>
        );
    }
}

ArticleView.propTypes = {
    article: PropTypes.object.isRequired,
};

export default ArticleView;

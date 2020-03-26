import React, {Component} from 'react';
import ArticleContentTypeContainer from "../readerComponents/articleContentTypeContainer";
import PropTypes from 'prop-types'

class ArticleView extends Component {
    render() {
        let article = this.props.article;
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
        );
    }
}

ArticleView.propTypes = {
    article: PropTypes.object.isRequired,
};

export default ArticleView;

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Article from 'models/article'
import './article.css'

class ArticleView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            article: props.data
        }
    }

    render() {
        let article = this.state.article;
        return (
            <React.Fragment>
                <h1 className="article-title">{article.title}</h1>
                <hr />
                <div className="section-container">
                    {article.sections.map((section) => {
                        return (
                            <div key={section.number} className="section" id={`${section.number}`}>
                                <h2>{section.number} {section.title}</h2>
                                <div className="sub-section-container">
                                    {section.subSections.map((ss) => {
                                        return (
                                            <div key={ss.number} className="sub-section" id={`${section.number}-${ss.number}`}>
                                                <h3> {ss.number} {ss.title} </h3>
                                                <div className="sub-section-content">
                                                    {ss.content}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </React.Fragment>
        )
    }
}

ArticleView.propTypes = {
    data: PropTypes.instanceOf(Article)
}

export default ArticleView
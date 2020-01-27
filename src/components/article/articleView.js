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
                    {article.sections.map((section) => (
                        <SectionComponent key={section.number} section={section} />
                    ))}
                </div>
            </React.Fragment>
        )
    }
}

const SectionComponent = ({ section }) => {
    console.log(section)
    return (
        <div className="section" id={`${section.number}`}>
            <h2>{section.number} {section.title}</h2>
            <div className="sub-section-container">
                {section.subSections.map((ss) => (
                    <SubSectionComponent key={ss.number} ss={ss} sectionNumber={section.number} />
                ))}
            </div>
        </div>
    );
}

const SubSectionComponent = ({ ss, sectionNumber }) => {
    return (
        <div className="sub-section" id={`${sectionNumber}-${ss.number}`}>
            <h3> {ss.number} {ss.title} </h3>
            <div className="sub-section-content">
                {ss.content}
            </div>
        </div>
    );
}

ArticleView.propTypes = {
    data: PropTypes.instanceOf(Article)
}

export default ArticleView
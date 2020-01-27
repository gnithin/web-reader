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
        this.idList = new Set();
    }

    componentDidMount() {
        console.log("All ids - ")
        for (let id of this.idList) {
            console.log(id)
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
                            <this.SectionComponent key={section.number} section={section} />
                        );
                    }
                    )}
                </div>
            </React.Fragment>
        )
    }

    SectionComponent = ({ section }) => {
        let id = `${section.number}`
        this.idList.add(id)
        return (
            <div className="section" id={id}>
                <h2>{section.number} {section.title}</h2>
                <div className="sub-section-container">
                    {section.subSections.map((ss) => (
                        <this.SubSectionComponent key={ss.number} ss={ss} sectionNumber={section.number} />
                    ))}
                </div>
            </div>
        );
    }

    SubSectionComponent = ({ ss, sectionNumber }) => {
        let id = `${sectionNumber}-${ss.number}`
        this.idList.add(id)
        return (
            <div className="sub-section" id={id}>
                <h3> {ss.number} {ss.title} </h3>
                <div className="sub-section-content">
                    {ss.content}
                </div>
            </div>
        );
    }
}

ArticleView.propTypes = {
    data: PropTypes.instanceOf(Article)
}

export default ArticleView
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Article from 'models/article'
import ReaderUtils from 'common/readerUtils'
import './article.css'

class ArticleView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            article: props.data,
        }
        this.visibleSections = new Set();
        this.visibleSectionNumber = 1;
    }

    componentDidMount() {
        let options = {
            root: document.querySelector('.article-container'),
            rootMargin: '0px',
            threshold: 1.0
        }

        let observer = new IntersectionObserver(this.intersectionHandler.bind(this), options);
        let subSectionsList = document.getElementsByClassName(`sub-section`)
        for (let target of subSectionsList) {
            observer.observe(target);
        }
    }

    intersectionHandler(entries, observer) {
        for (let entry of entries) {
            let ssVal = parseFloat(entry.target.getAttribute('data-ss'))
            if (entry.isIntersecting) {
                this.visibleSections.add(ssVal)
            } else {
                if (this.visibleSections.has(ssVal)) {
                    this.visibleSections.delete(ssVal)
                }
            }
        }

        // Recalculate the top entry. Ideally would use a min-heap
        let minVal = Infinity;
        for (let ss of this.visibleSections) {
            if (ss < minVal) {
                minVal = ss
            }
        }

        if (minVal !== Infinity) {
            if (this.visibleSectionNumber !== minVal) {
                this.visibleSectionNumber = minVal;
                this.props.sectionVisibilityCb(this.visibleSectionNumber);
            }
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
        let id = ReaderUtils.createNavigableId(section.number)
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
        let id = ReaderUtils.createNavigableId(ss.number)
        return (
            <div className="sub-section" id={id} data-ss={ss.number}>
                <h3> {ss.number} {ss.title} </h3>
                <div className="sub-section-content">
                    {ss.content}
                </div>
            </div>
        );
    }
}

ArticleView.propTypes = {
    data: PropTypes.instanceOf(Article),
    sectionVisibilityCb: PropTypes.func
}

export default ArticleView
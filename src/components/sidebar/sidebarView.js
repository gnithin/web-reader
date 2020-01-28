import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Article from 'models/article'
import ReaderUtils from 'common/readerUtils'
import './sidebar.css'

class SidebarView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            article: props.data,
            visibleSection: props.visibleSection,
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.visibleSection !== newProps.visibleSection) {
            this.setState({ visibleSection: newProps.visibleSection });
        }
    }

    render() {
        let highlightedClass = "is-selected";
        let article = this.state.article;
        return (
            <React.Fragment>
                <div className="sidebar-title">
                    {article.title}
                </div>
                <ul>
                    {article.sections.map((section) => {
                        return (
                            <li key={section.number} className="section-list">
                                <a href={`/#${ReaderUtils.createNavigableId(section.number)}`} className="section-title">{section.number}. {section.title}</a>
                                <ul className="list-group">
                                    {section.subSections.map((ss) => {
                                        let classList = "sub-section-title"
                                        console.log(`${ss.number} === ${this.state.visibleSection} => ${ss.number === this.state.visibleSection}`);
                                        if (ss.number === this.state.visibleSection) {
                                            classList = `${classList} ${highlightedClass}`
                                        }
                                        return (
                                            <li key={ss.number}>
                                                <a href={`/#${ReaderUtils.createNavigableId(ss.number)}`} className={classList}>{ss.number}. {ss.title}</a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </React.Fragment>
        )
    }
}

SidebarView.propTypes = {
    data: PropTypes.instanceOf(Article).isRequired,
    visibleSection: PropTypes.number.isRequired,
}

export default SidebarView
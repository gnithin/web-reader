import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Article from 'models/article'
import './sidebar.css'

class SidebarView extends Component {
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
                <div className="sidebar-title">
                    {article.title}
                </div>
                <ul>
                    {article.sections.map((section) => {
                        return (
                            <li key={section.number} className="section-list">
                                <div className="section-title">{section.number}. {section.title}</div>
                                <ul className="list-group">
                                    {section.subSections.map((ss) => {
                                        return (
                                            <li key={ss.number}>
                                                <span className="sub-section-title">{ss.number}. {ss.title}</span>
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
    data: PropTypes.instanceOf(Article)
}

export default SidebarView
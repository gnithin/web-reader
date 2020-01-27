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
                                <a href={`/#${section.number}`} className="section-title">{section.number}. {section.title}</a>
                                <ul className="list-group">
                                    {section.subSections.map((ss) => {
                                        return (
                                            <li key={ss.number}>
                                                <a href={`/#${section.number}-${ss.number}`} className="sub-section-title">{ss.number}. {ss.title}</a>
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
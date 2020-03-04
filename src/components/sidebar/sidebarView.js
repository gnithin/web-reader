import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReaderUtils from 'common/readerUtils'
import './sidebar.css'
import {connect} from "react-redux";
import Utils from "../../common/utils";

class SidebarView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visibleSection: props.visibleSection,
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.visibleSection !== newProps.visibleSection) {
            this.setState({visibleSection: newProps.visibleSection});
        }
    }

    render() {
        let highlightedClass = "is-selected";
        let article = this.props.article;
        if (Utils.isEmptyObject(article)) {
            return (<span/>);
        }

        return (
            <React.Fragment>
                <div className="sidebar-title">
                    {article.title}
                </div>
                <ul className="list-unstyled">
                    {article.sections.map((section) => {
                        let sectionClass = `section-title`
                        if (section.number === this.state.visibleSection) {
                            sectionClass = `${sectionClass} ${highlightedClass}`
                        }
                        return (
                            <li key={section.number} className="section-list">
                                <a href={`#${ReaderUtils.createNavigableId(section.number)}`}
                                   className={sectionClass}>
                                    <span
                                        className="section-title-label">{section.number}. {section.title}</span>
                                </a>
                                <ul className="list-unstyled">
                                    {section.subSections.map((ss) => {
                                        let classList = "sub-section-title"
                                        console.log(
                                            `${ss.number} === ${this.state.visibleSection} => ${ss.number
                                                                                                === this.state.visibleSection}`);
                                        if (ss.number === this.state.visibleSection) {
                                            classList = `${classList} ${highlightedClass}`
                                        }
                                        return (
                                            <li key={ss.number}>
                                                <a href={`#${ReaderUtils.createNavigableId(
                                                    ss.number)}`}
                                                   className={classList}>{ss.number}. {ss.title}</a>
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
    visibleSection: PropTypes.number.isRequired,
};

const reduxToComponentMapper = (state) => {
    return {
        article: state.article.data,
    }
};

export default connect(reduxToComponentMapper, null)(SidebarView);

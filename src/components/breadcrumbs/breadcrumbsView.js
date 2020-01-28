import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Article from 'models/article'
import Utils from 'common/utils'
import './breadcrumbs.css'

class BreadcrumbsView extends Component {
    constructor(props) {
        super(props)

        let visibleSection = props.visibleSection;
        if (Utils.isNull(visibleSection)) {
            visibleSection = 1
        }

        this.state = {
            visibleSection: visibleSection,
            data: props.data,
        }

        this.crumbsMap = this.computeCrumbs(props.data);
    }

    computeCrumbs(data) {
        let cMap = {}
        if (Utils.isNull(data)) {
            return cMap;
        }

        let title = data.title;
        for (let section of data.sections) {
            cMap[section.number] = [title, `${section.number}. ${section.title}`]
            for (let ss of section.subSections) {
                cMap[ss.number] = [title, `${section.number}. ${section.title}`, `${ss.number}. ${ss.title}`]
            }
        }
        return cMap;
    }

    componentWillReceiveProps(newProps) {
        if (newProps.visibleSection !== this.props.visibleSection) {
            this.setState({ visibleSection: newProps.visibleSection });
        }
    }

    render() {
        let crumb = this.crumbsMap[this.state.visibleSection]
        if (Utils.isNull(crumb)) {
            crumb = [this.state.data.title]
        }

        return (
            <div className="crumb-container">
                {crumb.map((c) => {
                    return (<div className="crumb-value" key={c}>{c}</div>);
                })}
            </div>
        )
    }
}

BreadcrumbsView.propTypes = {
    data: PropTypes.instanceOf(Article).isRequired,
    visibleSection: PropTypes.number.isRequired,
}

export default BreadcrumbsView
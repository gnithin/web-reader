import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Article from 'models/article'
import Utils from 'common/utils'
import ReaderUtils from 'common/readerUtils'
import './breadcrumbs.css'
import {connect} from "react-redux";

class BreadcrumbsView extends Component {
    constructor(props) {
        super(props)

        let visibleSection = props.visibleSection;
        if (Utils.isNull(visibleSection)) {
            visibleSection = 1
        }

        this.state = {
            visibleSection: visibleSection,
        }

        this.crumbsMap = this.computeCrumbs(props.data);
    }

    computeCrumbs(data) {
        let cMap = {}
        if (Utils.isEmptyObject(data)) {
            return cMap;
        }

        let title = data.title;
        for (let section of data.sections) {
            cMap[section.number] = [
                [title],
                [`${section.number}. ${section.title}`,
                 `#${ReaderUtils.createNavigableId(section.number)}`]
            ]
            for (let ss of section.subSections) {
                cMap[ss.number] = [
                    [title],
                    [`${section.number}. ${section.title}`,
                     `#${ReaderUtils.createNavigableId(section.number)}`],
                    [`${ss.number}. ${ss.title}`, `#${ReaderUtils.createNavigableId(ss.number)}`]
                ]
            }
        }
        return cMap;
    }

    componentWillReceiveProps(newProps) {
        if (newProps.visibleSection !== this.props.visibleSection) {
            this.setState({visibleSection: newProps.visibleSection});
        }
    }

    render() {
        // TODO: Fix this
        return (<span/>);

        let crumb = this.crumbsMap[this.state.visibleSection]
        if (Utils.isNull(crumb)) {
            crumb = [this.state.data.title]
        }

        return (
            <div className="crumb-container">
                {crumb.map((c) => {
                    console.log(c)
                    let hrefVal = "";
                    if (c.length !== 1) {
                        hrefVal = c[1]
                    }
                    return (
                        <div className="crumb-value" key={c[0]}>
                            <a href={hrefVal}>{c[0]}</a>
                        </div>
                    );
                })}
            </div>
        )
    }
}

BreadcrumbsView.propTypes = {
    data: PropTypes.instanceOf(Article).isRequired,
    visibleSection: PropTypes.number.isRequired,
}

const reduxToComponentMapper = (state) => {
    return {
        data: state.article.data,
    };
};

export default connect(reduxToComponentMapper, null)(BreadcrumbsView)
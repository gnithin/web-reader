import React, {Component} from 'react'
import './breadcrumbs.css'
import {connect} from "react-redux";
import Utils from "../../common/utils";
import {Link} from "react-router-dom";

class BreadcrumbsView extends Component {
    render() {
        let path = this.props.currPathEntry;
        if (Utils.isNull(path)) {
            return (<div className="crumb-container"></div>)
        }

        return (
            <div className="crumb-container">
                {this.renderCrumbs(path)}
            </div>
        );
    }

    renderCrumbs(path) {
        if (path.length < 3) {
            return (path.map((crumb, i) => {
                let parentClass = "crumb-last";
                if (i === 0) {
                    parentClass = "crumb-first";
                }

                return (
                    <div className={parentClass} key={`crumb-val-${i}`}>
                        {this.renderCrumbValue(crumb)}
                    </div>
                );
            }))
        }

        // Divide into first, middle and last
        let firstPath = path[0];
        let lastPath = path[path.length - 1];
        let middlePaths = path.slice(1, path.length - 1);
        return (
            <React.Fragment>
                <div className="crumb-first">
                    {this.renderCrumbValue(firstPath)}
                </div>

                <div className="crumbs-middle">
                    {middlePaths.map(
                        (crumb, i) => {
                            return (
                                this.renderCrumbValue(crumb, `crumb-val-${i}`)
                            )
                        }
                    )}
                </div>

                <div className="crumb-last">
                    {this.renderCrumbValue(lastPath)}
                </div>
            </React.Fragment>
        );
    }

    renderCrumbValue(entry, key = "") {
        return (
            <div className="crumb-value" key={key}>
                <Link to={`/reader/${entry.identifier}`}>
                    {entry.title}
                </Link>
            </div>
        );
    }
}

const reduxToComponentMapper = (state) => {
    return {
        data: state.article.data,
        currPathEntry: state.path.currPathEntry,
    };
};

export default connect(reduxToComponentMapper, null)(BreadcrumbsView)
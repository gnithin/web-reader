import React, {Component} from 'react'
import './breadcrumbs.css'
import {connect} from "react-redux";
import Utils from "../../common/utils";

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
                        <div className="crumb-value">
                            {crumb.title}
                        </div>
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
                    <div className="crumb-value">
                        {firstPath.title}
                    </div>
                </div>

                <div className="crumbs-middle">
                    {middlePaths.map((crumb, i) => {
                        return (
                            <div className="crumb-value" key={`crumb-val-${i}`}>
                                {crumb.title}
                            </div>
                        )
                    })}
                </div>

                <div className="crumb-last">
                    <div className="crumb-value">
                        {lastPath.title}
                    </div>
                </div>
            </React.Fragment>
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
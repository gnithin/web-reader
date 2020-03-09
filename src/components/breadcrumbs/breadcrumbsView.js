import React, {Component} from 'react'
import './breadcrumbs.css'
import {connect} from "react-redux";

class BreadcrumbsView extends Component {
    render() {
        let path = this.getBreadCrumbPath()
        return (
            <div className="crumb-container">
                {this.renderCrumbs(path)}
            </div>
        );
    }

    renderCrumbs(path) {
        if (path.length < 3) {
            return (path.map(crumb => {
                return (
                    <div className="crumb-value">
                        {crumb.title}
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
                    {middlePaths.map(crumb => {
                        return (
                            <div className="crumb-value">
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

    getBreadCrumbPath() {
        let path = this.props.data.path;
        // TODO: Remove this -
        path = this.getDummyPath();
        return path;
    }

    getDummyPath() {
        return [
            {
                title: "1",
                id: "1"
            },
            {
                title: "2",
                id: "2"
            },
            {
                title: "3",
                id: "3"
            },
            {
                title: "4",
                id: "4"
            },
            {
                title: "5",
                id: "5"
            },
            {
                title: "5",
                id: "5"
            },
            {
                title: "5",
                id: "5"
            },
            {
                title: "5",
                id: "5"
            },
            {
                title: "5",
                id: "5"
            },
            {
                title: "5",
                id: "5"
            },
            {
                title: "5",
                id: "5"
            },
            {
                title: "5",
                id: "5"
            },
            {
                title: "5",
                id: "5"
            },
            {
                title: "5",
                id: "5"
            },
            {
                title: "5",
                id: "5"
            },
            {
                title: "5",
                id: "5"
            },
            {
                title: "5",
                id: "5"
            },
            {
                title: "5",
                id: "5"
            },
            {
                title: "5",
                id: "5"
            },
            {
                title: "5",
                id: "5"
            },
        ];
    }
}

const reduxToComponentMapper = (state) => {
    return {
        data: state.article.data,
    };
};

export default connect(reduxToComponentMapper, null)(BreadcrumbsView)
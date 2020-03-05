import React, {Component} from 'react'
import './breadcrumbs.css'
import {connect} from "react-redux";

class BreadcrumbsView extends Component {
    render() {
        // TODO: Fix this
        return (<span/>);
    }
}

const reduxToComponentMapper = (state) => {
    return {
        data: state.article.data,
    };
};

export default connect(reduxToComponentMapper, null)(BreadcrumbsView)
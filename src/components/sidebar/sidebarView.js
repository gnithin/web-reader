import React, {Component} from 'react'
import './sidebar.css'
import {connect} from "react-redux";
import Utils from "../../common/utils";

class SidebarView extends Component {
    render() {
        let article = this.props.article;
        if (Utils.isEmptyObject(article)) {
            return (<span/>);
        }

        return (
            <React.Fragment>
                <div className="sidebar-title">
                    {article.title}
                </div>
            </React.Fragment>
        )
    }
}

const reduxToComponentMapper = (state) => {
    return {
        article: state.article.data,
    }
};

export default connect(reduxToComponentMapper, null)(SidebarView);

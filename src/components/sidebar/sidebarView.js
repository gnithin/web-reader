import React, {Component} from 'react'
import PropTypes from 'prop-types'
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

SidebarView.propTypes = {
    visibleSection: PropTypes.number.isRequired,
};

const reduxToComponentMapper = (state) => {
    return {
        article: state.article.data,
    }
};

export default connect(reduxToComponentMapper, null)(SidebarView);

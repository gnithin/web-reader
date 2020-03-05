import React, {Component} from 'react';
import {connect} from "react-redux";
import Utils from "../../common/utils";
import {Link} from "react-router-dom";

class ChildrenBarView extends Component {
    render() {
        if (Utils.isEmptyObject(this.props.article)) {
            return (<React.Fragment/>);
        }

        return (
            <ul>
                {this.props.article.children.map((entry, i) => {
                    return (
                        <li key={`child-${i}`}>
                            <Link to={`${entry._id}`}>{`${entry.title}`}</Link>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

const reduxToComponentMapper = (state) => {
    return {
        article: state.article.data,
    }
};

export default connect(reduxToComponentMapper)(ChildrenBarView);
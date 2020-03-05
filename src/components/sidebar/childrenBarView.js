import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Utils from "../../common/utils";
import {Link} from "react-router-dom";

class ChildrenBarView extends Component {
    render() {
        if (Utils.isEmptyObject(this.props.article) ||
            Utils.isNull(this.props.article.children) ||
            this.props.article.children.length === 0
        ) {
            return (<React.Fragment/>);
        }

        return (
            <React.Fragment>
                <div>
                    {this.props.title}
                </div>
                <ul>
                    {this.props.article.children.map((entry, i) => {
                        return (
                            <li key={`child-${i}`}>
                                <Link to={`${entry._id}`}>{`${entry.title}`}</Link>
                            </li>
                        );
                    })}
                </ul>
            </React.Fragment>
        );
    }
}

ChildrenBarView.propTypes = {
    title: PropTypes.string,
    article: PropTypes.object,
};

export default ChildrenBarView;
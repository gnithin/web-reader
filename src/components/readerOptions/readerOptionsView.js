import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Utils from "../../common/utils";

class ReaderOptionsView extends Component {
    render() {
        if (Utils.isNull(this.props.articlesList)) {
            return (
                <div>No items to display here.</div>
            );
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h2>Choose your title</h2>

                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <ul>
                            {
                                this.props.articlesList.map((article, i) => {
                                    return (<li key={`article-list-item-${i}`}>
                                        <Link to={`/reader/${article._id}`}>
                                            {article.title}
                                        </Link>
                                    </li>);
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const reduxToComponentMapper = (state) => {
    return {
        articlesList: state.articlesList.data,
    }
};

export default connect(reduxToComponentMapper, null)(ReaderOptionsView);
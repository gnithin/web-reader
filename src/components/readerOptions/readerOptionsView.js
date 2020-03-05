import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Utils from "../../common/utils";
import './readerOptions.css'

class ReaderOptionsView extends Component {
    render() {
        if (Utils.isNull(this.props.articlesList)) {
            return (
                <div>No items to display here.</div>
            );
        }

        return (
            <div className="container-fluid options-wrapper">
                <div className="row">
                    <div className="col-12 options-content">
                        <h2>Choose your title</h2>

                    </div>
                </div>

                <div className="row">
                    <div className="offset-3 col-6 options-content">
                        <div className="list-group options-list">
                            {
                                this.props.articlesList.map((article, i) => {
                                    return (
                                        <Link
                                            key={`article-list-item-${i}`}
                                            className="list-group-item"
                                            to={`/reader/${article._id}`}
                                        >
                                            {article.title}
                                        </Link>
                                    );
                                })
                            }
                        </div>
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
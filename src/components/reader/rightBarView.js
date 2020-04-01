import React, {Component} from 'react';
import Utils from "../../common/utils";
import {Link, withRouter} from "react-router-dom";
import "./rightBar.css";

class RightBarView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
        }
    }

    render() {
        return (
            <div className="right-bar-container">
                <div className="row no-gutters">
                    <div className="col-10">
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.searchText}
                            placeholder="Search for keywords here..."
                            onChange={(e) => {
                                this.setState({
                                                  searchText: e.target.value,
                                              });
                            }}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    this.performSearch()
                                }
                            }}
                        />
                    </div>

                    <div className="col-2">
                        <button className="btn btn-primary" onClick={(e) => {
                            this.performSearch();
                        }}>
                            <i className="fa fa-arrow-right" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>

                <div className="row no-gutters other-links-wrapper">
                    <div className="col-12">
                        Other Links
                    </div>
                    <div className="col-12">
                        <ul>
                            <li>
                                <Link
                                    to='/appendix'
                                    target="_blank"
                                >
                                    Appendix
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    performSearch() {
        if (Utils.isEmptyStr(this.state.searchText)) {
            console.log("Cannot perform search since the text is empty!");
            return;
        }

        this.props.history.push(`/search?title=${this.state.searchText}`);
    }
}

export default withRouter(RightBarView);

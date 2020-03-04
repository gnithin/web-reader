import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Utils from "../../../../common/utils";
import './chooseParent.css'

class ChooseParentView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            selectedIndex: -1,
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="choose-parent-top-bar row">
                    <input
                        type="text"
                        className="form-control col-10"
                        value={this.state.title}
                        onChange={(e) => {
                            this.setState({
                                              title: e.target.value,
                                          })
                        }}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                this.performSearch();
                            }
                        }}
                        placeholder="Choose a parent"
                    />
                    <button className="btn btn-primary col-2" onClick={(e) => {
                        this.performSearch()
                    }}>
                        Search
                    </button>
                </div>

                <div className="choose-parent-results-container row">
                    {this.displayResults()}
                </div>
            </React.Fragment>
        );
    }

    performSearch() {
        this.setState({selectedIndex: -1});
        this.props.parentSelectedCb(null);
        this.props.searchTitleCb(this.state.title);
    }

    displayResults() {
        if (Utils.isNull(this.props.results)) {
            return (<React.Fragment/>);
        }

        return (
            <div className="choose-parent-results col-12">
                <div className="choose-parent-title">
                    Results -
                </div>
                {this.props.results.map((result, i) => {
                    let divClassName = "choose-parent-result";
                    if (i === this.state.selectedIndex) {
                        divClassName = `${divClassName} choose-parent-result-selected`
                    }
                    return (
                        <div
                            key={`choose-parent-entry-${i}`}
                            className={divClassName}
                            onClick={(e) => {
                                this.setState({selectedIndex: i});
                                this.props.parentSelectedCb(result);
                            }}
                        >
                            {result.title} : {result.path}
                        </div>
                    );
                })}
            </div>
        );
    }
}

ChooseParentView.propType = {
    parentSelectedCb: PropTypes.func.isRequired,
    searchTitleCb: PropTypes.func.isRequired,
    results: PropTypes.array,
};
export default ChooseParentView;
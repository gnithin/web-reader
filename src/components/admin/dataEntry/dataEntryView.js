import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './dataEntry.css'
import Utils from "../../../common/utils";
import ChooseParent from "./chooseParent/chooseParentContainer";

class DataEntryView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.getStateFromProps(props),
        }
    }

    getStateFromProps(props) {
        return {
            title: props.title,
            content: props.content,
            parentId: null,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.title !== this.props.title) {
            this.setState(this.getStateFromProps(prevProps));
        }

        if (prevProps.content !== this.props.content) {
            this.setState(this.getStateFromProps(prevProps));
        }
    }

    render() {
        return (
            <div className="container-fluid data-entry-container">
                <div className="row da-input-entry da-heading">
                    <h3>Data Entry</h3>
                </div>

                {this.getInfo()}

                <div className="row da-input-entry no-gutters">
                    <div className="col-12">
                        <input
                            type="string"
                            id="title"
                            placeholder="Title"
                            className="form-control"
                            value={this.state.title}
                            onChange={(e) => {
                                this.setState({title: e.target.value});
                            }}
                        />
                    </div>
                </div>

                <div className="row da-input-entry no-gutters">
                    <div className="col-12">
                    <textarea
                        id="content"
                        placeholder="Content"
                        className="form-control"
                        value={this.state.content}
                        onChange={(e) => {
                            this.setState({content: e.target.value})
                        }}
                    />
                    </div>
                </div>

                <div className="row da-input-entry">
                    <div className="col-12">
                        <ChooseParent
                            parentSelectedCb={(parentData) => {
                                let id = parentData._id;
                                console.log("Selected! - ", parentData);
                                if (false === Utils.isNull(id)) {
                                    this.setState({parentId: id});
                                } else {
                                    console.log("Choose-parent: Got empty parent-id")
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="row da-input-entry no-gutters">
                    <div className="col-12">
                        <button className="btn btn-primary" onClick={(e) => {
                            this.props.addEntryCb({
                                                      ...this.state
                                                  });
                        }}>Add Entry
                        </button>
                    </div>
                </div>

            </div>
        );
    }

    getInfo() {
        if (Utils.isNull(this.props.info)) {
            return (<React.Fragment/>)
        }
        return (<div className="row da-input-entry da-input-info">
            <div>
                {this.props.info}
            </div>
        </div>);
    }
}

DataEntryView.propType = {
    addEntryCb: PropTypes.func.isRequired,
};

export default DataEntryView;
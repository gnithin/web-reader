import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './dataEntry.css'

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

                <div className="row da-input-entry">
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

                <div className="row da-input-entry">
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
                        TODO: Choose parent
                    </div>
                </div>

                <div className="row da-input-entry">
                    <div className="col-12">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="customFile"/>
                            <label className="custom-file-label" htmlFor="customFile">Choose
                                file
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row da-input-entry">
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
}

DataEntryView.propType = {
    addEntryCb: PropTypes.func.isRequired,
};

export default DataEntryView;
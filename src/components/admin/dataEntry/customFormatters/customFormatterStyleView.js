import React, {Component} from 'react';
import Utils from "../../../../common/utils";

class CustomFormatterStyleView extends Component {
    constructor(props) {
        super(props);
        this.state = this.getStateFromProps(props)
    }

    getStateFromProps(props) {
        return {
            className: Utils.getVal(props.className),
            text: Utils.getVal(props.text),
            styleStr: Utils.getVal(props.styleStr),
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            this.props.className !== prevProps.className ||
            this.props.text !== prevProps.text ||
            this.props.styleStr !== prevProps.styleStr
        ) {
            this.setState({...this.getStateFromProps(this.props)});
        }
    }

    render() {
        return (
            <div className="cf-style-wrapper">
                <input
                    type="string"
                    className="form-control"
                    placeholder="Display text"
                    value={this.state.text}
                    onChange={(e) => {
                        this.setState(
                            {text: e.target.value},
                            () => {
                                this.props.updateCb(this.state)
                            }
                        )
                    }}
                />
                <br/>

                <input
                    type="string"
                    className="form-control"
                    placeholder="Style classname (if it already exists)"
                    value={this.state.className}
                    onChange={(e) => {
                        this.setState(
                            {className: e.target.value},
                            () => {
                                this.props.updateCb(this.state)
                            }
                        )
                    }}
                />
                <br/>

                <input
                    type="string"
                    className="form-control"
                    placeholder="Style CSS string"
                    value={this.state.styleStr}
                    onChange={(e) => {
                        this.setState(
                            {styleStr: e.target.value},
                            () => {
                                this.props.updateCb(this.state)
                            }
                        )
                    }}
                />
                <br/>

            </div>
        );
    }
}

export default CustomFormatterStyleView;

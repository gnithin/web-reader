import React, {Component} from 'react';

class CustomFormatterStyleView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            className: "",
            text: "",
        }
    }

    render() {
        return (
            <div className="cf-style-wrapper">
                <input
                    type="string"
                    className="form-control"
                    placeholder="Style classname"
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
                    placeholder="Style text"
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

            </div>
        );
    }
}

export default CustomFormatterStyleView;

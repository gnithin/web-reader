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
            <div className="cf-image-wrapper">
                <input
                    type="string"
                    className="form-control"
                    value={this.state.className}
                    onChange={(e) => {
                        this.setState({src: e.target.value})
                    }}
                />

                <input
                    type="string"
                    className="form-control"
                    value={this.state.text}
                    onChange={(e) => {
                        this.setState({alt: e.target.value})
                    }}
                />
            </div>
        );
    }
}

export default CustomFormatterStyleView;
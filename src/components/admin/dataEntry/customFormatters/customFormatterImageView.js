import React, {Component} from 'react';
import PropTypes from 'prop-types'

class CustomFormatterImageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: "",
            alt: "",
        };
    }

    render() {
        return (
            <div className="cf-image-wrapper">
                <input
                    type="string"
                    className="form-control"
                    value={this.state.src}
                    onChange={(e) => {
                        this.setState({src: e.target.value})
                    }}
                    placeholder="Image Source"
                    onBlur={(e) => {
                        this.props.updateCb(this.state)
                    }}
                />

                <br/>

                <input
                    type="string"
                    className="form-control"
                    value={this.state.alt}
                    onChange={(e) => {
                        this.setState({alt: e.target.value})
                    }}
                    placeholder="Image Alt"
                    onBlur={(e) => {
                        this.props.updateCb(this.state)
                    }}
                />

                <br/>
            </div>
        );
    }
}

CustomFormatterImageView.PropType = {
    updateCb: PropTypes.func.isRequired,
};

export default CustomFormatterImageView;
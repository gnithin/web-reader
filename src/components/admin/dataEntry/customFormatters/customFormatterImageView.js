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
                        this.setState(
                            {src: e.target.value},
                            () => {
                                this.props.updateCb(this.state)
                            }
                        )
                    }}
                    placeholder="Image url (Uploaded to SharePoint)"
                />

                <br/>

                <input
                    type="string"
                    className="form-control"
                    value={this.state.alt}
                    onChange={(e) => {
                        this.setState(
                            {alt: e.target.value},
                            () => {
                                this.props.updateCb(this.state)
                            }
                        )
                    }}
                    placeholder="Image Alternate text (when image doesn't load)"
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

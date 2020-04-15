import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Utils from "../../../../common/utils";

class CustomFormatterImageView extends Component {
    constructor(props) {
        super(props);
        this.state = this.getStateFromProps(props);
    }

    getStateFromProps(props) {
        return {
            src: Utils.getVal(props.src),
            alt: Utils.getVal(props.alt),
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.src !== prevProps.src || this.props.alt !== prevProps.alt) {
            this.setState({...this.getStateFromProps(this.props)});
        }
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

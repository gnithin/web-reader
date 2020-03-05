import React, {Component} from 'react';
import './contentCreator.css'
import Utils from "../../../../common/utils";
import PropTypes from 'prop-types'

class ContentCreatorView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            imageURL: "",
            alignment: "",
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.description !== this.props.description ||
            prevProps.imageURL !== this.props.imageURL ||
            prevProps.alignment !== this.props.alignment ||
            prevProps.title !== this.props.title
        ) {

            this.setState({
                              title: this.props.title,
                              description: this.props.description,
                              imageURL: this.props.imageURL,
                              alignment: this.props.alignment,
                          });
        }
    }

    render() {
        return (
            <div className="content-creator-container row">
                <div className="col-12 content-input content-input-top-bar">
                    <span className="content-heading">
                        Create content
                    </span>
                    <span className="content-close">
                        <i
                            className="fa fa-times"
                            aria-hidden="true"
                            onClick={(_) => {
                                this.props.deleteContentCb();
                            }}
                        />
                    </span>
                </div>

                <div className="col-12 content-input">
                    <input
                        type="string"
                        value={this.state.title}
                        className="form-control"
                        placeholder="Title"
                        onChange={(e) => {
                            return this.setState({
                                                     title: e.target.value,
                                                 });
                        }}
                        onBlur={(_) => {
                            this.updateContainer();
                        }}
                        autoFocus={true}
                    />
                </div>

                <div className="col-12 content-input">
                    <textarea
                        value={this.state.description}
                        className="form-control"
                        placeholder="Enter content description here"
                        onChange={(e) => {
                            return this.setState({
                                                     description: e.target.value,
                                                 });
                        }}
                        onBlur={(_) => {
                            this.updateContainer();
                        }}
                    />
                </div>

                <div className="col-12 content-input">
                    <input
                        type="string"
                        value={this.state.imageURL}
                        className="form-control"
                        placeholder="Enter image link here"
                        onChange={(e) => {
                            return this.setState({
                                                     imageURL: e.target.value,
                                                 });
                        }}
                        onBlur={(_) => {
                            this.updateContainer();
                        }}
                    />
                </div>

                {this.displayAlignment()}

            </div>
        );
    }

    updateContainer() {
        this.updateAlignment();
        this.props.updateContentCb({...this.state});
    }

    updateAlignment() {
        if ((Utils.isEmptyStr(this.state.description) || Utils.isEmptyStr(this.state.imageURL))) {
            if (false === Utils.isEmptyStr(this.state.alignment)) {
                this.setState({alignment: ""});
            }
        }
    }

    displayAlignment() {
        if (Utils.isEmptyStr(this.state.description) || Utils.isEmptyStr(this.state.imageURL)) {
            return (<React.Fragment/>);
        }

        return (
            <div className="col-12 content-input">
                <select
                    value={this.state.alignment}
                    onChange={(e) => {
                        this.setState({alignment: e.target.value})
                    }}
                    onBlur={(_) => {
                        this.updateContainer();
                    }}
                >
                    <option disabled value=""> Select Alignment</option>
                    <option value="right">Right Align</option>
                    <option value="left">Left Align</option>
                </select>
            </div>
        );

    }
}

ContentCreatorView.propType = {
    updateContentCb: PropTypes.func.isRequired,
    deleteContentCb: PropTypes.func.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    imageURL: PropTypes.string,
    alignment: PropTypes.string,
};

export default ContentCreatorView;
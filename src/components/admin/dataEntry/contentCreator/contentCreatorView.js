import React, {Component} from 'react';
import './contentCreator.css'
import Utils from "../../../../common/utils";

// TODO: Prop types
class ContentCreatorView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            imgLink: "",
            alignment: "",
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.description !== this.props.description ||
            prevProps.imgLink !== this.props.imgLink ||
            prevProps.alignment !== this.props.alignment ||
            prevProps.title !== this.props.title
        ) {

            this.setState({
                              title: this.props.title,
                              description: this.props.description,
                              imgLink: this.props.imgLink,
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
                            onClick={(e) => {
                                this.props.deleteCb();
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
                        onBlur={(e) => {
                            this.updateContainer();
                        }}
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
                        onBlur={(e) => {
                            this.updateContainer();
                        }}
                    />
                </div>

                <div className="col-12 content-input">
                    <input
                        type="string"
                        value={this.state.imgLink}
                        className="form-control"
                        placeholder="Enter image link here"
                        onChange={(e) => {
                            return this.setState({
                                                     imgLink: e.target.value,
                                                 });
                        }}
                        onBlur={(e) => {
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
        this.props.getUpdateCb({...this.state});
    }

    updateAlignment() {
        if ((Utils.isEmptyStr(this.state.description) || Utils.isEmptyStr(this.state.imgLink))) {
            if (false === Utils.isEmptyStr(this.state.alignment)) {
                this.setState({alignment: ""});
            }
        }
    }

    displayAlignment() {
        if (Utils.isEmptyStr(this.state.description) || Utils.isEmptyStr(this.state.imgLink)) {
            return (<React.Fragment/>);
        }

        return (
            <div className="col-12 content-input">
                <select
                    value={this.state.alignment}
                    onChange={(e) => {
                        this.setState({alignment: e.target.value})
                    }}
                    onBlur={(e) => {
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

export default ContentCreatorView;
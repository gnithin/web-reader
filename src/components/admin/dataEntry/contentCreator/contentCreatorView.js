import React, {Component} from 'react';
import './contentCreator.css'
import Utils from "../../../../common/utils";

class ContentCreatorView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            imgLink: "",
            alignment: "",
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.description !== this.props.description ||
            prevProps.imgLink !== this.props.imgLink ||
            prevProps.alignment !== this.props.alignment
        ) {

            this.setState({
                              description: this.props.description,
                              imgLink: this.props.imgLink,
                              alignment: this.props.alignment,
                          });
        }
    }

    render() {
        return (
            <div className="content-creator-container row">
                <div className="col-12">
                    Create content
                </div>
                <div className="col-12">
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

                <div className="col-12">
                    <textarea
                        value={this.state.description}
                        className="form-control"
                        placeholder="Enter content here"
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
            <div className="col-12">
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
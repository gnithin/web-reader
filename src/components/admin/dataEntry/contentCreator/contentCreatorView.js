import React, {Component} from 'react';
import './contentCreator.css'

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

            </div>
        );
    }

    updateContainer() {
        let newData = {
            ...this.state,
        };
        this.props.getUpdateCb(newData);
    }
}

export default ContentCreatorView;
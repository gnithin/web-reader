import React, {Component} from 'react';

class CustomFormatterHyperlinkView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            href: "",
            text: "",
        }
    }

    render() {
        return (
            <div className="cf-hyperlink-wrapper">
                <input
                    type="string"
                    className="form-control"
                    value={this.state.href}
                    onChange={(e) => {
                        this.setState(
                            {href: e.target.value},
                            () => {
                                this.props.updateCb(this.state)
                            }
                        )
                    }}
                    placeholder="Hyperlink href"
                />
                <br/>

                <input
                    type="string"
                    className="form-control"
                    value={this.state.text}
                    onChange={(e) => {
                        this.setState(
                            {text: e.target.value},
                            () => {
                                this.props.updateCb(this.state)
                            }
                        )
                    }}
                    placeholder="Hyperlink text"
                />
                <br/>

            </div>
        );
    }
}

export default CustomFormatterHyperlinkView;

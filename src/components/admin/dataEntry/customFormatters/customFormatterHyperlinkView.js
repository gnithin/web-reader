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
                        this.setState({href: e.target.value})
                    }}
                    placeholder="Hyperlink href"
                    onBlur={(e) => {
                        this.props.updateCb(this.state)
                    }}
                />
                <br/>

                <input
                    type="string"
                    className="form-control"
                    value={this.state.text}
                    onChange={(e) => {
                        this.setState({text: e.target.value})
                    }}
                    placeholder="Hyperlink text"
                    onBlur={(e) => {
                        this.props.updateCb(this.state)
                    }}
                />
                <br/>

            </div>
        );
    }
}

export default CustomFormatterHyperlinkView;

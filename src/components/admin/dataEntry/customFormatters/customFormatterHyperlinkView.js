import React, {Component} from 'react';

class CustomFormatterHyperlinkView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            href: "",
            text: "",
            shouldOpenInNewTab: true,
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
                    placeholder="Hyperlink url"
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
                    placeholder="Hyperlink display text"
                />
                <br/>

                <input
                    id="openNewTab"
                    type="checkbox"
                    className="custom-checkbox"
                    checked={this.state.shouldOpenInNewTab}
                    onChange={(e) => {
                        this.setState(
                            {shouldOpenInNewTab: e.target.checked},
                            () => {
                                this.props.updateCb(this.state)
                            }
                        )
                    }}
                    placeholder="Hyperlink text"
                />
                &nbsp;
                <label className="form-check-label" htmlFor="openNewTab">
                    Open link in new tab
                </label>

            </div>
        );
    }
}

export default CustomFormatterHyperlinkView;

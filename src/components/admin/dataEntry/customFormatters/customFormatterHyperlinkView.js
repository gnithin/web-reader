import React, {Component} from 'react';
import Utils from "../../../../common/utils";

class CustomFormatterHyperlinkView extends Component {
    constructor(props) {
        super(props);
        this.state = this.getStateFromProps(props);
    }

    getStateFromProps(props) {
        return {
            href: Utils.getVal(props.href),
            text: Utils.getVal(props.text),
            shouldOpenInNewTab: Utils.getVal(props.shouldOpenInNewTab, true),
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.href !== this.props.href ||
            prevProps.text !== this.props.text ||
            prevProps.shouldOpenInNewTab !== this.props.shouldOpenInNewTab
        ) {
            this.setState({...this.getStateFromProps(this.props)});
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

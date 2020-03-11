import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import Utils from "../../../../common/utils";
import CONSTANTS from "../../../../common/constants";
import CustomFormatterImageView from "./customFormatterImageView";
import CustomFormatterHyperlinkView from "./customFormatterHyperlinkView";
import CustomFormatterStyleView from "./customFormatterStyleView";

class CustomFormatter extends Component {
    constructor(props) {
        super(props);
        this.state = this.getStateFromProps(props)
    }

    getStateFromProps(props) {
        let content = this.props.contents[this.props.contentIndex];
        let formatter = content.customFormatters[this.props.formatterIndex];
        return {
            currentType: formatter.type,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.contentIndex !== this.props.contentIndex ||
            prevProps.formatterIndex !== this.props.formatterIndex
        ) {
            this.setState(this.getStateFromProps(this.props));
        }
    }

    render() {
        let content = this.props.contents[this.props.contentIndex];
        let formatter = content.customFormatters[this.props.formatterIndex];

        return (
            <div className="formatter-wrapper">
                <div>
                    <select value={this.state.currentType} onChange={(e) => {
                        return this.setState({
                                                 currentType: e.target.value,
                                             });
                    }}>
                        <option value={CONSTANTS.CUSTOM_FORMATTERS.TYPES.IMAGE}>
                            Image
                        </option>
                        <option value={CONSTANTS.CUSTOM_FORMATTERS.TYPES.HYPERLINK}>
                            Hyperlink
                        </option>
                        <option value={CONSTANTS.CUSTOM_FORMATTERS.TYPES.STYLE}>
                            Style
                        </option>
                    </select>
                </div>

                <div>
                    {this.renderFormatter(formatter)}
                </div>
            </div>
        );
    }

    renderFormatter(formatter) {
        if (Utils.isNull(formatter)) {
            return (<span/>);
        }

        switch (formatter.type) {
            case CONSTANTS.CUSTOM_FORMATTERS.TYPES.IMAGE: {
                return this.renderImageCustomFormatter(formatter);
            }

            case CONSTANTS.CUSTOM_FORMATTERS.TYPES.HYPERLINK: {
                return this.renderHyperlinkCustomFormatter(formatter);
            }

            case CONSTANTS.CUSTOM_FORMATTERS.TYPES.STYLE: {
                return this.renderStyleCustomFormatter(formatter);
            }

            default:
                return (<span/>);
        }
    }

    renderImageCustomFormatter(formatter) {
        return (
            <CustomFormatterImageView
                src={formatter.src}
                alt={formatter.alt}
                updateCb={(newVal) => {
                    console.log("DEBUG: Update - ", newVal);
                }}
            />
        );
    }

    renderHyperlinkCustomFormatter(formatter) {
        return (
            <CustomFormatterHyperlinkView
                href={formatter.href}
                text={formatter.text}
                updateCb={(newVal) => {
                    console.log("DEBUG: Update - ", newVal);
                }}
            />
        );
    }

    renderStyleCustomFormatter(formatter) {
        return (
            <CustomFormatterStyleView
                className={formatter.className}
                text={formatter.text}
                updateCb={(newVal) => {
                    console.log("DEBUG: Update - ", newVal);
                }}
            />
        );
    }

}

CustomFormatter.propTypes = {
    contentIndex: PropTypes.number.isRequired,
    formatterIndex: PropTypes.number.isRequired,
};

const reduxToComponentMapper = (state) => {
    return {
        contents: state.dataEntry.contents,
    };
};

const componentToReduxMapper = (dispatcher) => {
    return {
        // TODO: Add logic here
    };
};

export default connect(reduxToComponentMapper, null)(CustomFormatter);
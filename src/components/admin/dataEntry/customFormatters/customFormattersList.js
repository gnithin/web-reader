import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import './customFormattersList.css'
import Utils from "../../../../common/utils";
import CustomFormatter from "./customFormatter";

class CustomFormattersList extends Component {
    render() {
        let currContent = this.props.contents[this.props.contentIndex];
        let formatters = currContent.customFormatters;
        if (Utils.isNull(formatters)) {
            formatters = []
        }

        return (
            <div className="custom-formatters-list-wrapper">
                <div className="custom-formatters-list">
                    {formatters.map((formatter, i) => {
                        return (
                            <CustomFormatter
                                contentIndex={this.props.contentIndex}
                                formatterIndex={i}
                            />
                        );
                    })}

                </div>

                <div className="add-new-custom-formatter">
                    Click to add new custom-formatter &nbsp;
                    <button
                        onClick={(e) => {
                            this.props.addCustomFormatter(this.props.contentIndex);
                        }}
                        className="btn btn-primary"
                    >
                        <i className="fa fa-plus" aria-hidden="true"/>
                    </button>
                </div>
            </div>
        );
    }
}

CustomFormattersList.propType = {
    contentIndex: PropTypes.number.isRequired,
};

const reduxToComponentMapper = (state) => {
    return {
        contents: state.dataEntry.contents
    };
};

const componentToReduxMapper = (dispatcher) => {
    return {
        addCustomFormatter: (contentIndex) => {
            // TODO: Add the formatter
        }
    }
};

export default connect(reduxToComponentMapper, componentToReduxMapper)(CustomFormattersList);
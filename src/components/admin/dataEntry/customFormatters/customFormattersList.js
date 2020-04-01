import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import './customFormattersList.css'
import Utils from "../../../../common/utils";
import CustomFormatterView from "./customFormatterView";
import CustomFormatterModel from 'models/customFormatter'
import DataEntryActions from "../../../../redux/actions/dataEntryActions";

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
                            <CustomFormatterView
                                key={`custom-formatter-${this.props.contentIndex}-${i}`}
                                contentIndex={this.props.contentIndex}
                                formatterIndex={i}
                            />
                        );
                    })}
                </div>

                <div className="add-new-custom-formatter">
                    Click to add new formatter &nbsp;
                    <button
                        onClick={(e) => {
                            // Add the data
                            this.props.addCustomFormatter(
                                this.props.contentIndex,
                                new CustomFormatterModel({})
                            );
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
        addCustomFormatter: (contentIndex, data) => {
            dispatcher(DataEntryActions.addCustomFormatter(contentIndex, data));
        }
    }
};

export default connect(reduxToComponentMapper, componentToReduxMapper)(CustomFormattersList);

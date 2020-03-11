import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";

class CustomFormatter extends Component {
    render() {
        let content = this.props.contents[this.props.contentIndex];
        let formatter = content.customFormatters[this.props.formatterIndex];

        return (
            <div>
                New custom formatter!!!
            </div>
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
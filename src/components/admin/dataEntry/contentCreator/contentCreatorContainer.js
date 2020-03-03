import React, {Component} from 'react';
import ContentCreatorView from "./contentCreatorView";
import {connect} from "react-redux";

class ContentCreatorContainer extends Component {
    render() {
        return (
            <ContentCreatorView/>
        );
    }
}

const reduxToPropsMapper = (state) => {
    // TODO:
    return {}
};

const componentToReduxMapper = (dispatcher) => {
    // TODO:
    return {}
};

export default connect(reduxToPropsMapper, componentToReduxMapper)(ContentCreatorContainer);
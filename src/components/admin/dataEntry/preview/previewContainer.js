import React, {Component} from 'react';
import PropTypes from 'prop-types'
import DataEntry from "../../../../models/dataEntry";

class PreviewContainer extends Component {
    render() {
        // NOTE: This is what is exactly sent in the request.
        let entry = new DataEntry(this.props.dataEntry);
        console.log("PROPS - ", entry);
        return (
            <div>
                Preview!!!
            </div>
        );
    }
}

PreviewContainer.propTypes = {
    dataEntry: PropTypes.object.isRequired,
};

export default PreviewContainer;

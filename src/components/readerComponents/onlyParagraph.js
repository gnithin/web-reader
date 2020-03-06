import React, {Component} from 'react';
import PropTypes from 'prop-types'

class OnlyParagraph extends Component {
    render() {
        return (
            <p>
                {this.props.description}
            </p>
        )
    }
}

OnlyParagraph.propTypes = {
    description: PropTypes.string.isRequired,
};

export default OnlyParagraph;
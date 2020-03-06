import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Utils from "../../common/utils";

class OnlyParagraph extends Component {
    render() {
        return (
            <div>
                {false === Utils.isNull(this.props.title) && <h2>{this.props.title}</h2>}
                <p>
                    {this.props.description}
                </p>
            </div>
        )
    }
}

OnlyParagraph.propTypes = {
    description: PropTypes.string.isRequired,
    title: PropTypes.string,
};

export default OnlyParagraph;
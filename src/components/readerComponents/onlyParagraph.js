import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Utils from "../../common/utils";
import CustomFormatterManager from 'managers/customFormatterManager'

class OnlyParagraph extends Component {
    render() {
        return (
            <div>
                {false === Utils.isNull(this.props.title) && <h2>{this.props.title}</h2>}
                <p
                    dangerouslySetInnerHTML={{
                        _html: CustomFormatterManager.formatDescription(
                            this.props.description,
                            formatters
                        )
                    }}
                />
            </div>
        )
    }
}

OnlyParagraph.propTypes = {
    description: PropTypes.string.isRequired,
    title: PropTypes.string,
    formatters: PropTypes.array,
};

export default OnlyParagraph;
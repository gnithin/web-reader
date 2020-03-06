import React, {Component} from 'react';
import PropTypes from 'prop-types'

class ParagraphWithImage extends Component {
    render() {
        let imgStyle = {
            margin: "15px 15px 15px 15px"
        };
        let imageFloat = this.props.isImgLeft ? "float-left" : "float-right";

        return (
            <div>
                <img
                    src={this.props.imgSrc}
                    width={this.props.imgWidth}
                    height={this.props.imgHeight}
                    alt={this.props.imgTitle}
                    title={this.props.imgTitle}
                    className={imageFloat}
                    style={imgStyle}
                />
                <p>{this.props.description}</p>
            </div>
        );
    }
}

ParagraphWithImage.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    imgTitle: PropTypes.string.isRequired,
    imgWidth: PropTypes.number,
    imgHeight: PropTypes.number,
    description: PropTypes.string,
    isImgLeft: PropTypes.bool,
};

export default ParagraphWithImage;
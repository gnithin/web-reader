import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Utils from "../../common/utils";

class ParagraphWithImage extends Component {
    render() {
        let imgStyle = {
            margin: "15px 15px 15px 15px"
        };
        let imageFloat = this.props.isImgLeft ? "float-left" : "float-right";

        return (
            <div>
                {false === Utils.isNull(this.props.title) && <h2>{this.props.title}</h2>}
                <img
                    src={this.props.imgSrc}
                    width={this.props.imgWidth}
                    height={this.props.imgHeight}
                    alt={this.props.imgTitle}
                    className={imageFloat}
                    style={imgStyle}
                />
                <p>
                    {this.props.description}
                </p>
            </div>
        );
    }
}

ParagraphWithImage.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    imgTitle: PropTypes.string,
    imgWidth: PropTypes.number,
    imgHeight: PropTypes.number,
    description: PropTypes.string,
    title: PropTypes.string,
    isImgLeft: PropTypes.bool,
    formatters: PropTypes.array,
};

export default ParagraphWithImage;
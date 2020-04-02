import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Utils from "../../common/utils";
import ParagraphView from "./paragraphView";

class ParagraphWithImage extends Component {
    render() {
        let imgStyle = {
            margin: "10px",
            // TODO: Remove this. This is for the demo only!
            width: "150px"
        };

        let imageFloat = this.props.isImgLeft ? "float-left" : "float-right";
        let imageTitle = "";
        if (false === Utils.isNull(this.props.imgTitle)) {
            imageTitle = this.props.imgTitle;
        }

        return (
            <div style={{clear: "both"}}>
                {false === Utils.isNull(this.props.title) && <h2>{this.props.title}</h2>}
                <img
                    src={this.props.imgSrc}
                    width={this.props.width}
                    height={this.props.height}
                    alt={imageTitle}
                    title={imageTitle}
                    className={imageFloat}
                    style={imgStyle}
                />
                <ParagraphView
                    description={this.props.description}
                    formatters={this.props.formatters}
                />
            </div>
        );
    }
}

ParagraphWithImage.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    imgTitle: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
    isImgLeft: PropTypes.bool,
    formatters: PropTypes.array,
};

export default ParagraphWithImage;

import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-image-resizer';

class ParagraphWithImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imgSrc: props.imgSrc,
            description: props.description,
            imageFloat: props.isImgLeft ? "float-left" : "float-right",
            imgWidth: props.imgWidth,
            imgHeight: props.imgHeight,
            imgTitle: props.imgTitle
        }

        this.imgStyle = {
            image: {
                float: props.isImgLeft ? "left" : "right",
                margin: "15px 15px 15px 15px"
            }
          };
    }

    render() {
        return (
            <Container fluid={true} className="reader-container">
                <Image 
                    src = {this.state.imgSrc} 
                    className = {this.state.imageFloat} 
                    width = {this.state.imgWidth}
                    height = {this.state.imgHeight}
                    alt = {this.state.imgTitle}
                    style = {this.imgStyle.image}
                    />
                <p>{this.state.description}</p>
            </Container>
        );
    }
}

export default ParagraphWithImage;
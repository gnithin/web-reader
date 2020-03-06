import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Utils from 'common/utils';

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
        };

        this.imgStyle = {
            image: {
                margin: "15px 15px 15px 15px"
            }
        };
    }

    componentWillMount() {
        if (!Utils.isNull(this.state.imgWidth) || !Utils.isNull(this.state.imgHeight)) {
            return;
        }

        let img = new Image();
        var self = this;
        img.onload = function () {
            self.setState({imgWidth: this.width, imgHeight: this.height, imgLoaded: this.src});
        };
        img.src = this.state.imgSrc;
    }

    render() {
        return (
            <Container fluid={true} className="reader-container">
                <img
                    src={this.state.imgSrc}
                    width={this.state.imgWidth}
                    title={this.state.imgTitle}
                    className={this.state.imageFloat}
                    style={this.imgStyle.image}
                    alt={this.state.imgTitle}
                />
                <p>{this.state.description}</p>
            </Container>
        );
    }
}

export default ParagraphWithImage;
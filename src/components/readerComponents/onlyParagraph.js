import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';

class OnlyParagraph extends Component {
    constructor(props) {
        super(props);

        this.state = {
            description: props.description
        }
    }

    render() {
        return (
            <Container fluid={true} className="reader-container">
                {this.state.description}
            </Container>
        );
    }
}

export default OnlyParagraph;
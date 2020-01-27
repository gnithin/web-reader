import React, { Component } from 'react'
import Article from 'components/article'
import Sidebar from 'components/sidebar'
import Breadcrumbs from 'components/breadcrumbs'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './reader.css'
import ArticleDataSource from 'dataSource/articleDataSource'

class ReaderContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            article: null,
        }
    }

    componentDidMount() {
        ArticleDataSource.fetchDataSource().then((data) => {
            this.setState({
                isLoading: false,
                article: data,
            })

            console.log("Got data")
            console.log(data)
        })

    }

    render() {
        if (this.state.isLoading) {
            return (<div>Loading...</div>)
        }

        return (
            <Container fluid={true} className="reader-container">
                <Row noGutters={true}>
                    <Col className="breadcrumbs-container">
                        <Breadcrumbs />
                    </Col>
                </Row>
                <Row noGutters={true} className="main-content-container">
                    <Col md={2} className="sidebar-container d-none d-md-block">
                        <Sidebar />
                    </Col>
                    <Col xs={12} md={10} className="article-container">
                        <Article />
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default ReaderContainer;
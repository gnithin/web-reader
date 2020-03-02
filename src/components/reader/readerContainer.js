import React, {Component} from 'react'
import Article from 'components/article'
import Sidebar from 'components/sidebar'
import Breadcrumbs from 'components/breadcrumbs'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ArticleDataSource from 'services/articleService'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import './reader.css'

class ReaderContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            article: null,
            visibleSection: 1,
            isSidebarVisible: true,
        }
    }

    componentDidMount() {
        ArticleDataSource.fetchDataSource().then((data) => {
            console.log("Got data")
            console.log(data)

            this.setState({
                              isLoading: false,
                              article: data,
                          })
        })
    }

    render() {
        if (this.state.isLoading) {
            return (<div>Loading...</div>)
        }

        return (
            <Container fluid={true} className="reader-container">
                <Row noGutters={true}>
                    <Col xs={{span: 'auto'}} className="d-none d-md-block">
                        <Button variant="light" onClick={this.toggleSidebar.bind(this)}>
                            <FontAwesomeIcon icon={faBars}/>
                        </Button>
                    </Col>
                    <Col className="breadcrumbs-container">
                        <Breadcrumbs
                            data={this.state.article}
                            visibleSection={this.state.visibleSection}
                        />
                    </Col>
                </Row>
                <Row noGutters={true} className="main-content-container">
                    {this.getSidebar()}
                    <Col className="article-container">
                        <Article
                            data={this.state.article}
                            sectionVisibilityCb={this.sectionVisibilityHandler.bind(this)}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }

    getSidebar() {
        if (!this.state.isSidebarVisible) {
            return (<span></span>)
        }
        return (
            <Col md={2} className="sidebar-container d-none d-md-block">
                <Sidebar
                    data={this.state.article}
                    visibleSection={this.state.visibleSection}
                />
            </Col>
        )
    }

    sectionVisibilityHandler(sectionNumber) {
        this.setState({visibleSection: sectionNumber});
        console.log("Visibility Changed - ")
        console.log(sectionNumber)
    }

    toggleSidebar() {
        this.setState({
                          isSidebarVisible: !this.state.isSidebarVisible
                      })
    }
}

export default ReaderContainer;
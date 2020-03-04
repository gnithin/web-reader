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
import {connect} from "react-redux";
import ArticleActions from "../../redux/actions/articleActions";

class ReaderContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isSidebarVisible: true,
        }
    }

    componentDidMount() {
        ArticleDataSource.fetchDataSource(this.props.id).then((data) => {
            console.log("Got data");
            console.log(data);

            this.setState({
                              isLoading: false,
                          });
            this.props.addArticle(data);

        }).catch(err => {
            console.error("Error fetching data from server - ", err)
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
                        <Breadcrumbs/>
                    </Col>
                </Row>
                <Row noGutters={true} className="main-content-container">
                    {this.getSidebar()}

                    <Col className="article-container">
                        <Article/>
                    </Col>
                </Row>
            </Container>
        );
    }

    getSidebar() {
        if (!this.state.isSidebarVisible) {
            return (<span/>)
        }

        return (
            <Col md={2} className="sidebar-container d-none d-md-block">
                <Sidebar/>
            </Col>
        )
    }

    toggleSidebar() {
        this.setState({
                          isSidebarVisible: !this.state.isSidebarVisible
                      })
    }
}

const reduxToComponentMapper = (state) => {
    return {
        article: state.article.data,
    }
};

const componentToReduxMapper = (dispatcher) => {
    return {
        addArticle: (article) => {
            dispatcher(ArticleActions.addArticleData(article));
        }
    }
};

export default connect(reduxToComponentMapper, componentToReduxMapper)(ReaderContainer);

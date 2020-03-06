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
import {faBars, faHome} from '@fortawesome/free-solid-svg-icons'
import './reader.css'
import {connect} from "react-redux";
import ArticleActions from "../../redux/actions/articleActions";
import {Link} from "react-router-dom";
import SearchComponent from 'components/searchbox/searchComponent'

const READER_URL_KEY = "id";

class ReaderContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isSidebarVisible: true,
        }
    }

    componentDidMount() {
        this.fetchDataForId(this.props.match.params[READER_URL_KEY]);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.match.params !== this.props.match.params &&
            prevProps.match.params.id !== this.props.match.params.id
        ) {
            this.fetchDataForId(this.props.match.params[READER_URL_KEY]);
        }
    }

    fetchDataForId(id) {
        ArticleDataSource.fetchDataSourceForId(id).then((data) => {
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
                    <Col xs={{span: 'auto'}} className="d-none d-md-block">
                        <Link to="/reader">
                            <Button variant="light">
                                <FontAwesomeIcon icon={faHome}/>
                            </Button>
                        </Link>
                    </Col>
                    <Col className="breadcrumbs-container">
                        <Breadcrumbs/>
                    </Col>
                </Row>
                <Row noGutters={true} className="main-content-container">
                    {this.getSidebar()}

                    <Col md={8} className="article-container">
                        <Article/>
                    </Col>
                    <Col md={1} className="mt-5 tags-container">
                        <SearchComponent />
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

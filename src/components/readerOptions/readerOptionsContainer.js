import React, {Component} from 'react';
import ReaderOptionsView from "./readerOptionsView";
import ArticleService from "../../services/articleService";
import {connect} from "react-redux";
import ArticlesListActions from "../../redux/actions/articlesListActions";
import Utils from "../../common/utils";
import LoadingView from "../loading";

class ReaderOptionsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }

    componentDidMount() {
        ArticleService.fetchDataSource()
            .then(articlesList => {
                if (Utils.isNull(articlesList)) {
                    console.error("Got empty articles-list!");
                } else {
                    console.log("Articles list - ", articlesList);
                }

                this.props.updateArticlesList(articlesList);
                this.setState({isLoading: false});
            }).catch(err => {
            console.log("Error Fetching the articles list - ", err)
        })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <LoadingView/>
            );
        }
        return (
            <ReaderOptionsView/>
        );
    }
}

const reduxToComponentMapper = (state) => {
    return {
        articlesList: state.articlesList.data,
    }
};

const componentToReduxMapper = (dispatcher) => {
    return {
        updateArticlesList: (articlesList) => {
            dispatcher(ArticlesListActions.updateArticlesList(articlesList));
        }
    }
};

export default connect(reduxToComponentMapper, componentToReduxMapper)(ReaderOptionsContainer);
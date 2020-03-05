import React, {Component} from 'react';
import ReaderOptionsView from "./readerOptionsView";
import ArticleService from "../../services/articleService";
import {connect} from "react-redux";
import ArticlesListActions from "../../redux/actions/articlesListActions";
import Utils from "../../common/utils";

class ReaderOptionsContainer extends Component {
    componentDidMount() {
        ArticleService.fetchDataSource()
            .then(articlesList => {
                if (Utils.isNull(articlesList)) {
                    console.error("Got empty articles-list!");
                } else {
                    console.log("Articles list - ", articlesList);
                }

                this.props.updateArticlesList(articlesList);
            }).catch(err => {
            console.log("Error Fetching the articles list - ", err)
        })
    }

    render() {
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
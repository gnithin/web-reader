import React, {Component} from 'react'
import './sidebar.css'
import {connect} from "react-redux";
import Utils from "../../common/utils";
import ChildrenBarView from "./childrenBarView";
import ArticleService from "../../services/articleService";
import ArticlesListActions from "../../redux/actions/articlesListActions";

class SidebarView extends Component {
    componentDidMount() {
        if (Utils.isNull(this.props.parentArticle)) {
            this.updateParentArticle();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.article !== this.props.article) {
            if (Utils.isNull(this.props.parentArticle)) {
                this.updateParentArticle();
            }
        }
    }

    render() {
        let article = this.props.article;
        if (Utils.isEmptyObject(article)) {
            return (<span/>);
        }

        return (
            <React.Fragment>
                <div className="sidebar-title">
                    {article.title}
                </div>
                {this.renderChildrenOfCurrentArticle()}
                {this.renderChildrenOfTopLevelArticle()}
            </React.Fragment>
        )
    }

    renderChildrenOfCurrentArticle() {
        return (
            <ChildrenBarView
                article={this.props.article}
                title="Children"
            />
        )
    }

    renderChildrenOfTopLevelArticle() {
        return (
            <ChildrenBarView
                article={this.props.parentArticle}
                title="Other links"
            />
        );
    }

    updateParentArticle() {
        if (Utils.isEmptyObject(this.props.article)) {
            console.log("Cannot fetch the parent-article if current article is empty!");
            return;
        }

        let currData = this.props.article;
        if (Utils.isNull(currData.paths) || currData.paths.length === 0) {
            console.log("Cannot fetch the parent-article if there are no paths!");
            return;
        }

        let earliestParentId = currData.paths[0].identifier;

        ArticleService.fetchDataSource()
            .then(articlesList => {
                if (Utils.isNull(articlesList)) {
                    console.error("Got empty articles-list!");
                    return;
                }

                console.log("Articles list - ", articlesList);
                let i = 0;
                for (let entry of articlesList) {
                    if (entry._id === earliestParentId) {
                        this.props.updateAndSelectArticlesList(articlesList, i);
                        break;
                    }
                    i += 1;
                }
                console.log("Cannot find entry for - ", earliestParentId);

            }).catch(err => {
            console.log("Error fetching data!", err);
        });
    }
}

const reduxToComponentMapper = (state) => {
    return {
        article: state.article.data,
        parentArticle: state.articlesList.selectedArticle,
    }
};

const componentToReduxMapper = (dispatcher) => {
    return {
        updateAndSelectArticlesList: (articlesList, index) => {
            dispatcher(ArticlesListActions.updateAndSelectFromArticlesList(articlesList, index));
        }
    }
};

export default connect(reduxToComponentMapper, componentToReduxMapper)(SidebarView);

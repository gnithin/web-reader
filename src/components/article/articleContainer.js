import React, {Component} from 'react'
import './article.css'
import Utils from 'common/utils'
import {connect} from "react-redux";
import CONSTANTS from "../../common/constants";
import ParagraphWithImage from "../readerComponents/imageParagraph";
import OnlyParagraph from "../readerComponents/onlyParagraph";

class ArticleContainer extends Component {
    render() {
        let article = this.props.article;

        if (Utils.isEmptyObject(article)) {
            return (
                <div>No data to be seen here</div>
            );
        }

        return (
            <React.Fragment>
                <h1 className="article-title">
                    {article.title}
                </h1>
                <div className="article-contents-container">
                    {article.contents.map((content, i) => {
                        return this.getComponentForContent(content, `content-${i}`);
                    })}
                </div>
            </React.Fragment>
        )
    }

    getComponentForContent(content, key) {
        switch (content.type) {
            case CONSTANTS.TYPES.PARA_AND_IMG:
                // TODO: Remove the hard-coded width and height
                return (
                    <ParagraphWithImage
                        key={key}
                        imgSrc={content.imageURL}
                        description={content.description}
                        isImgLeft={content.alignment === 'left'}
                        imgWidth={100}
                        imgHeight={100}
                        title={content.title}
                    />
                );
            case CONSTANTS.TYPES.PARA:
                return (
                    <OnlyParagraph
                        key={key}
                        description={content.description}
                    />
                );
            default:
                return <React.Fragment key={key}/>
        }
    }
}

const reduxToComponentMapper = (state) => {
    return {
        article: state.article.data,
    }
};

export default connect(reduxToComponentMapper, null)(ArticleContainer)
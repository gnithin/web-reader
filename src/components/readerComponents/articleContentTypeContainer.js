import React, {Component} from 'react';
import PropTypes from 'prop-types'
import CONSTANTS from "../../common/constants";
import ParagraphWithImage from "./paragraphWithImage";
import OnlyParagraph from "./onlyParagraph";

class ArticleContentTypeContainer extends Component {
    render() {
        let content = this.props.content;
        switch (content.type) {
            case CONSTANTS.TYPES.PARA_AND_IMG:
                return (
                    <ParagraphWithImage
                        imgSrc={content.imageURL}
                        title={content.title}
                        imgTitle={content.imageTitle}
                        description={content.description}
                        isImgLeft={content.alignment === 'left'}
                        formatters={content.customFormatters}
                    />
                );

            case CONSTANTS.TYPES.PARA:
                return (
                    <OnlyParagraph
                        description={content.description}
                        title={content.title}
                        formatters={content.customFormatters}
                    />
                );

            default:
                return <React.Fragment/>
        }
    }
}

ArticleContentTypeContainer.propTypes = {
    content: PropTypes.object.isRequired,
};
export default ArticleContentTypeContainer;

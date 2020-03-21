import React, {Component} from 'react';
import PropTypes from 'prop-types'
import DataEntry from "../../../../models/dataEntry";
import ArticleView from "../../../article/articleView";

class PreviewContainer extends Component {
    render() {
        // NOTE: This is what is exactly sent in the request.
        let entry = new DataEntry(this.props.dataEntry);
        console.log("PROPS - ", entry);
        return (
            <div className="preview-container">
                <h2>Preview</h2>
                <br/>
                <ArticleView article={entry}/>
            </div>
        );
    }
}

PreviewContainer.propTypes = {
    dataEntry: PropTypes.object.isRequired,
};

export default PreviewContainer;

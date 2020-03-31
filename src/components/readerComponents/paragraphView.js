import React from 'react';
import './paraViewStyles.css'
import CustomFormatterManager from "../../managers/customFormatterManager";
import Utils from "../../common/utils";

const ParagraphView = ({description, formatters}) => {
    if (Utils.isNull(description)) {
        description = "";
    }

    return (
        <p
            dangerouslySetInnerHTML={{
                __html: CustomFormatterManager.formatDescription(
                    description,
                    formatters
                )
            }}
            className="para-formatting"
        />
    );
};

export default ParagraphView;

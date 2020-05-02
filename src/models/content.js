import Utils from "../common/utils";
import CONSTANTS from "../common/constants";

export default class Content {
    constructor({title, description, imageURL, alignment, type, imageTitle, imageWidth, imageHeight, customFormatters},
                setTypeAutomatically = true) {
        this.title = Utils.isNull(title) ? "" : title;
        this.description = Utils.isNull(description) ? "" : description;
        this.imageURL = Utils.isNull(imageURL) ? "" : imageURL;
        this.alignment = Utils.isNull(alignment) ? "" : alignment;
        this.imageTitle = Utils.isNull(imageTitle) ? "" : imageTitle;
        this.imageWidth = Utils.isNull(imageWidth) ? "" : imageWidth;
        this.imageHeight = Utils.isNull(imageHeight) ? "" : imageHeight;

        if (false === setTypeAutomatically) {
            this.type = Utils.isNull(type) ? "" : type;
        } else {
            this.type = this.findType()
        }

        this.customFormatters = Utils.getVal(customFormatters, []);
    }

    assignType() {
        this.type = this.findType();
    }

    findType() {
        // NOTE: This can get complicated in the future
        let type = CONSTANTS.TYPES.PARA;
        if (false === Utils.isEmptyStr(this.imageURL)) {
            type = CONSTANTS.TYPES.PARA_AND_IMG;
        }
        return type;
    }
}

import Utils from "../common/utils";
import CONSTANTS from "../common/constants";

class CustomFormatterManager {
    formatDescription(description, formatters) {
        if (Utils.isNull(formatters) || formatters.length === 0) {
            return description;
        }

        // Find all the keyIds. Replace them appropriately
        let desc = description;
        for (let formatter in formatters) {
            desc = this.formatDescriptionWithFormatter(description, formatter);
        }

        return desc;
    }

    formatDescriptionWithFormatter(description, formatter) {
        switch (formatter.type) {
            case CONSTANTS.CUSTOM_FORMATTERS.TYPES.STYLE: {
                let content = `<div className="${formatter.className}">${formatter.text}</div>`;
                let key = formatter.keyId;
                return description.replace(
                    new RegExp(Utils.escapeRegexStr(key), "g"),
                    content
                );
            }

            case CONSTANTS.CUSTOM_FORMATTERS.TYPES.IMAGE: {
                let content = `<img src="${formatter.src}" alt="${formatter.alt}"/>`;
                let key = formatter.keyId;
                return description.replace(
                    new RegExp(Utils.escapeRegexStr(key), "g"),
                    content
                );
            }

            case CONSTANTS.CUSTOM_FORMATTERS.TYPES.HYPERLINK: {
                let content = `<a href="${formatter.href}">${formatter.text}</a>`;
                let key = formatter.keyId;
                return description.replace(
                    new RegExp(Utils.escapeRegexStr(key), "g"),
                    content
                );
            }

            default:
                return description
        }
    }
}

let instance = new CustomFormatterManager();
export default instance;
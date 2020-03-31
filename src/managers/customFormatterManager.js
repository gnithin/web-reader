import Utils from "../common/utils";
import CONSTANTS from "../common/constants";

class CustomFormatterManager {
    formatDescription(description, formatters) {
        if (Utils.isNull(formatters) || formatters.length === 0) {
            return description;
        }

        // Find all the keyIds. Replace them appropriately
        let desc = description;
        for (let formatter of formatters) {
            desc = this.formatDescriptionWithFormatter(desc, formatter);
        }

        return desc;
    }

    formatDescriptionWithFormatter(description, formatter) {
        let key = formatter.keyId;

        // NOTE: This null-check is only added due to the backend not supporting this property
        if (Utils.isNull(key)) {
            return description;
        }

        switch (formatter.type) {
            case CONSTANTS.CUSTOM_FORMATTERS.TYPES.STYLE: {
                let content = `<span className="${formatter.className}">${formatter.text}</span>`;
                return description.replace(
                    new RegExp(Utils.escapeRegexStr(key), "g"),
                    content
                );
            }

            case CONSTANTS.CUSTOM_FORMATTERS.TYPES.IMAGE: {
                let content = `<img src="${formatter.src}" alt="${formatter.alt}"/>`;
                return description.replace(
                    new RegExp(Utils.escapeRegexStr(key), "g"),
                    content
                );
            }

            case CONSTANTS.CUSTOM_FORMATTERS.TYPES.HYPERLINK: {
                let content = `<a href="${formatter.href}">${formatter.text}</a>`;
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
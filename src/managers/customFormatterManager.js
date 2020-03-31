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
                let classStr = '';
                if (false === Utils.isEmptyStr(formatter.className)) {
                    classStr = `class="${formatter.className}"`
                }

                let styleStr = '';
                if (false === Utils.isEmptyStr(formatter.styleStr)) {
                    styleStr = `style="${formatter.styleStr}"`
                }

                let content = `<span ${classStr} ${styleStr}>${formatter.text}</span>`;
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
                let shouldOpenInNewTab = true;
                if (false === Utils.isNull(formatter.shouldOpenInNewTab)) {
                    shouldOpenInNewTab = formatter.shouldOpenInNewTab;
                }

                let additionalProps = "";
                if (shouldOpenInNewTab) {
                    additionalProps = `target="_blank"`;
                }

                let content = `<a href="${formatter.href}" ${additionalProps}>${formatter.text}</a>`;
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

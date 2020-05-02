import CONSTANTS from "../common/constants";
import Utils from "../common/utils";
import ReaderUtils from "../common/readerUtils";

export default class CustomFormatter {
    constructor({type, src, alt, href, text, className, keyId}) {
        if (Utils.isNull(keyId)) {
            keyId = ReaderUtils.generateCustomFormatterId(Utils.generateFourDigitId());
        }
        this.keyId = keyId;

        this.type = CONSTANTS.CUSTOM_FORMATTERS.TYPES.IMAGE;
        if (false === Utils.isNull(type)) {
            this.type = type
        }

        // Image formatters
        this.src = "";
        if (false === Utils.isNull(src)) {
            this.src = src;
        }

        this.alt = "";
        if (false === Utils.isNull(alt)) {
            this.alt = alt;
        }

        // Hyperlink
        this.href = "";
        if (false === Utils.isNull(href)) {
            this.href = href;
        }

        this.text = "";
        if (false === Utils.isNull(text)) {
            this.text = text;
        }

        // Styles
        this.className = "";
        if (false === Utils.isNull(className)) {
            this.className = className;
        }
    }
}

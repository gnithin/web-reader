import Utils from "../common/utils";

class URLManager {
    constructor() {
        this.base_url = process.env.REACT_APP_BASE_URL;
        if (Utils.isEmptyStr(this.base_url)) {
            console.error("Cannot initialize app without base url!");
        }
    }
}

const urlManager = new URLManager();
export default urlManager

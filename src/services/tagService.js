import serviceUtils from "./serviceUtils";
import UrlManager from '../managers/urlManager'

const TAG_ENDPOINT = `${UrlManager.base_url}/im/v1/topics`;

export default class TagService {
    static fetchDataSourceForTags(tagsList) {
        let tagQuery = tagsList.join(",");
        return fetch(`${TAG_ENDPOINT}?tags=${tagQuery}`).then(resp => {
            if (!resp.ok) {
                throw Error(`Error when fetching tags ${resp}`)
            }
            return resp.json()
        }).then(dataList => {
            let res = [];
            for (let data of dataList) {
                res.push(serviceUtils.formatRawParentData(data));
            }
            return res;
        })
    }
}

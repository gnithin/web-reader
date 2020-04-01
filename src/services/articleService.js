import Utils from "../common/utils";
import ServiceUtils from "./serviceUtils";
import UrlManager from '../managers/urlManager'

const ENDPOINT = `${UrlManager.base_url}/im/v1/details`;

export default class ArticleService {
    static fetchDataSourceForId(id) {
        if (Utils.isNull(id)) {
            throw Error("ID cannot be empty!");
        }

        let endpoint = `${ENDPOINT}/${id}`;
        return fetch(endpoint).then(resp => {
            if (!resp.ok) {
                throw Error(`Error when fetching ${endpoint}`)
            }
            return resp.json()
        }).then(rawData => {
            return ServiceUtils.formatRawParentData(rawData);
        });
    }

    static fetchDataSource() {
        let endpoint = ENDPOINT;
        return fetch(endpoint).then(resp => {
            if (!resp.ok) {
                throw Error(`Error when fetching ${endpoint}`)
            }
            return resp.json()
        }).then(dataList => {
            let res = [];
            for (let data of dataList) {
                res.push(ServiceUtils.formatRawParentData(data));
            }
            return res;
        })
    }
}

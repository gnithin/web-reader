import Utils from "../common/utils";
import ServiceUtils from "./serviceUtils";

const ENDPOINT = "https://interactive-manual-server.herokuapp.com/im/v1/details";

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

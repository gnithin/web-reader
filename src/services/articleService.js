import Utils from "../common/utils";

const ENDPOINT = "/api/detail/"

export default class ArticleService {
    static fetchDataSource(id) {
        let endpoint = ENDPOINT;
        if (false === Utils.isNull(id)) {
            endpoint = `${endpoint}${id}`
        }

        return fetch(endpoint).then(resp => {
            return resp.json()
        });
    }
}
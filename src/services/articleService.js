import Utils from "../common/utils";

// const ENDPOINT = "/api/detail/"
// TODO: This is for debugging only
const ENDPOINT = "http://localhost:8081/article.json?";

export default class ArticleService {
    static fetchDataSource(id) {
        let endpoint = ENDPOINT;
        if (false === Utils.isNull(id)) {
            endpoint = `${endpoint}${id}`
        }

        return fetch(endpoint).then(resp => {
            if (!resp.ok) {
                throw Error(`Error when fetching ${endpoint}`)
            }
            return resp.json()
        });
    }
}
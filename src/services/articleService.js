import Utils from "../common/utils";

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
            // A little data re-organizing
            let data = rawData.parent;
            data.children = rawData.children;
            return data;
        });
    }

    static fetchDataSource() {
        // let endpoint = `${ENDPOINT}`;
        // TODO: Remove this
        let endpoint = `http://localhost:8081/articlesList.json`;
        return fetch(endpoint).then(resp => {
            if (!resp.ok) {
                throw Error(`Error when fetching ${endpoint}`)
            }
            return resp.json()
        })
    }
}
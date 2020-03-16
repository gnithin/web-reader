import Utils from "../common/utils";

const ENDPOINT = "https://interactive-manual-server.herokuapp.com/im/v1/details";
const DATA_ENDPOINT = "https://interactive-manual-server.herokuapp.com/im/v1/topics";

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
            return this.formatRawData(rawData);
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
                res.push(this.formatRawData(data));
            }
            return res;
        })
    }

    static formatRawData(rawData) {
        // A little data re-organizing
        let data = rawData.parent;
        data.children = rawData.children;
        return data;
    }

    static fetchDataSourceForTags(tagArr) {
        let endpoint = DATA_ENDPOINT;
        let tagQuery = "";
        tagArr.forEach((data) => {
            if (!Utils.isNull(data))
                tagQuery += data.text + ","
        })
        tagQuery = tagQuery.substring(0, tagQuery.length - 1);

        return fetch(endpoint + "?tag=" + tagQuery).then(resp => {
            if (!resp.ok) {
                throw Error(`Error when fetching ${endpoint}`)
            }
            return resp.json()
        }).then(dataList => {
            let res = [];
            for (let data of dataList) {
                res.push(this.formatRawData(data));
            }
            return res;
        })
    }
}
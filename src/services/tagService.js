import serviceUtils from "./serviceUtils";

const TAG_ENDPOINT = "https://interactive-manual-server.herokuapp.com/im/v1/topics";

export default class TagService {
    static fetchDataSourceForTags(tagArr) {
        let tagQuery = tagArr.join(",");
        tagQuery = tagQuery.substring(0, tagQuery.length - 1);

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

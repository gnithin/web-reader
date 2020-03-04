import Utils from "../common/utils";

const DATA_ENDPOINT = "https://interactive-manual-server.herokuapp.com/im/v1/topic";
const FIND_PARENT_ENDPOINT = "https://interactive-manual-server.herokuapp.com/im/v1/topic";

export default class DataEntryService {
    static insertDataEntry(entry) {
        return fetch(
            DATA_ENDPOINT,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(entry),
            }
        ).then(resp => {
            if (!resp.ok) {
                throw Error("Error inserting data. Response invalid!")
            }
            return resp.json()
        })
    }

    static findParentForTitle(title) {
        if (Utils.isNull(title)) {
            title = "";
        }

        return fetch(
            `${FIND_PARENT_ENDPOINT}?title=${title}`
        ).then(resp => {
            if (!resp.ok) {
                throw Error("Error finding data. Response invalid!")
            }
            return resp.json();
        });
    }
}
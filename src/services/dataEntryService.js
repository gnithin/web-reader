import Utils from "../common/utils";
import UrlManager from '../managers/urlManager'

const DATA_ENDPOINT = `${UrlManager.base_url}/im/v1/topic`;
const FIND_PARENT_ENDPOINT = `${UrlManager.base_url}/im/v1/topics`;

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

    static updateDataEntry(entry, id) {
        return fetch(
            `${DATA_ENDPOINT}/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(entry),
            }
        ).then(resp => {
            if (!resp.ok) {
                throw Error("Error updating data. Response invalid!")
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

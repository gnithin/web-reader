const DATA_ENDPOINT = "http://localhost:8081/"
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
}
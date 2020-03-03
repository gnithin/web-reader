import React, {Component} from 'react';
import DataEntryService from "../../../services/dataEntryService";
import DataEntry from "./dataEntryView";
import DataEntryModel from "../../../models/dataEntry";

class DataEntryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: null
        }
    }

    render() {
        return (
            <DataEntry
                addEntryCb={this.addEntryCb.bind(this)}
                title=""
                content=""
                info={this.state.info}
            />
        );
    }

    addEntryCb(rawEntry) {
        let entry = new DataEntryModel(rawEntry);
        console.log("Entry being added!");
        console.log(entry);

        // Perform the call to remote
        DataEntryService.insertDataEntry(entry).then(resp => {
            console.log("inserted - ", resp);
            this.setState({info: "Inserted successfully!"})

        }).catch(err => {
            console.error("Error on insertion - ", err)
            this.setState({info: "Error inserting entry :("})
        })
    }
}

export default DataEntryContainer;
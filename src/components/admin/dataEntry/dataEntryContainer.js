import React, {Component} from 'react';
import DataEntry from "./dataEntryView";

class DataEntryContainer extends Component {
    render() {
        return (
            <DataEntry
                addEntryCb={this.addEntryCb.bind(this)}
                title=""
                content=""
            />
        );
    }

    addEntryCb(entry) {
        console.log("Entry being added!");
        console.log(entry);
        // TODO: Perform the call to remote
    }
}

export default DataEntryContainer;
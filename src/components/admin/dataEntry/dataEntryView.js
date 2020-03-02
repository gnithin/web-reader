import React from 'react';
import './dataEntry.css'

const DataEntryView = () => {
    return (
        <div className="container-fluid data-entry-container">
            <div className="row da-input-entry da-heading">
                <h3>Data Entry</h3>
            </div>
            <div className="row da-input-entry">
                <div className="col-12">
                    <input
                        type="string"
                        id="title"
                        placeholder="Title"
                        className="form-control"
                    />
                </div>
            </div>

            <div className="row da-input-entry">
                <div className="col-12">
                    <textarea
                        id="content"
                        placeholder="Content"
                        className="form-control"
                    />
                </div>
            </div>

            <div className="row da-input-entry">
                <div className="col-12">
                    <select className="custom-select">
                        <option>Dummy</option>
                        <option>Dummy</option>
                        <option>Dummy</option>
                        <option>Dummy</option>
                        <option>Dummy</option>
                    </select>
                </div>
            </div>

            <div className="row da-input-entry">
                <div className="col-12">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="customFile"/>
                        <label className="custom-file-label" htmlFor="customFile">Choose
                            file
                        </label>
                    </div>
                </div>
            </div>

            <div className="row da-input-entry">
                <div className="col-12">
                    <button className="btn btn-primary">Add Entry</button>
                </div>
            </div>

        </div>
    );
};

export default DataEntryView;
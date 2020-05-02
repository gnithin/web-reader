import React, {Component} from 'react';
import DataEntryService from "../../../services/dataEntryService";
import DataEntry from "./dataEntryView";
import DataEntryModel from "../../../models/dataEntry";
import CONSTANTS from "../../../common/constants";
import Utils from "../../../common/utils";
import DataEntryActions from "../../../redux/actions/dataEntryActions";
import {connect} from "react-redux";
import LoadingView from "../../loading";
import ArticleService from "../../../services/articleService";
import Content from "../../../models/content";
import CustomFormatter from "../../../models/customFormatter";

class DataEntryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
            info: null,
            infoLink: null,
            infoType: null,
            isLoading: true,
            isError: false,
            errMsg: '',
        }
    }

    componentDidMount() {
        this.populateData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.match.params !== this.props.match.params &&
            prevProps.match.params.id !== this.props.match.params.id
        ) {
            this.setState({...this.getInitialState()});
            this.populateData()
        }
    }

    populateData() {
        let articleId = this.props.match.params.id;
        if (Utils.isNull(articleId)) {
            this.props.resetAdminData();
            this.setState({isLoading: false});
            return;
        }

        this.setState({isLoading: true});

        ArticleService.fetchDataSourceForId(articleId).then((data) => {
            this.props.setAdminData(this.preprocess(data));
            this.setState({isLoading: false});
        }).catch(e => {
            this.setState({isLoading: false, isError: true, errMsg: e.message})
        });
    }

    preprocess(data) {
        /*
          Process data into  -
            title: '',
            tags: '',
            contents: [],
            parentId: null,
            parent: null,
         */
        let newData = {
            title: data.title,
            tags: data.tags.join(","),
            parentId: data.parent,
            contents: [],
        };

        // Parse contents
        if (false === Utils.isNull(data.contents) || data.contents.length > 0) {
            let contentsList = [];
            for (let c of data.contents) {
                contentsList.push(new Content(c));
            }
            newData.contents = contentsList;
        }

        let parentObj = null;

        // Find the parent
        if (false === Utils.isNull(data.parent)) {
            if (false === Utils.isNull(data.paths)) {
                for (let path of data.paths) {
                    if (path.identifier === newData.parentId) {
                        parentObj = path;
                        break;
                    }
                }
            }
        }
        newData.parent = parentObj;
        console.log("DEBUG: - ", newData);

        return newData;
    }

    render() {
        if (this.state.isError) {
            return (
                <div>
                    Encountered and error! - {this.state.errMsg}.
                    <br/>
                    Please try going back or adding a new entry <a href={"/admin/pages"}>here</a>
                </div>
            );
        }

        if (this.state.isLoading) {
            return (
                <LoadingView/>
            );
        }

        return (
            <DataEntry
                addEntryCb={this.processEntryCb.bind(this)}
                info={this.state.info}
                infoType={this.state.infoType}
                infoLink={this.state.infoLink}
            />
        );
    }

    processEntryCb(rawEntry) {
        let entry = new DataEntryModel(rawEntry);
        console.log("Entry being added!");
        console.log(entry);
        this.setState({
                          info: "Sending...",
                          infoType: CONSTANTS.DATA_INFO.SENDING,
                      });

        // Scroll to the top
        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        });

        // Add or update depending on what the status is
        let articleId = this.props.match.params.id;
        let opPromise = null;

        if (Utils.isNull(articleId)) {
            // Add
            opPromise = DataEntryService.insertDataEntry(entry);

        } else {
            // update
            opPromise = DataEntryService.updateDataEntry(entry, articleId);
        }

        // Perform the call to remote
        opPromise.then(resp => {
            console.log("inserted - ", resp);
            this.props.history.push(`/admin/pages/${resp._id}`);

            let url = `/reader/${resp._id}`;
            this.setState({
                              info: "Inserted successfully!",
                              infoType: CONSTANTS.DATA_INFO.SUCCESS,
                              infoLink: url,
                          })

        }).catch(err => {
            console.error("Error on insertion - ", err);
            this.setState({
                              info: "Error inserting entry :(",
                              infoType: CONSTANTS.DATA_INFO.ERROR,
                              infoLink: null,
                          })
        })
    }
}

const reduxToStateMapper = (state) => {
    return {};
};

const stateToReduxMapper = (dispatcher) => {
    return {
        resetAdminData: () => {
            console.log("Resetting!");
            dispatcher(DataEntryActions.resetAdminData());
        },

        setAdminData: (data) => {
            dispatcher(DataEntryActions.setAdminData(data));
        }
    };
};

export default connect(reduxToStateMapper, stateToReduxMapper)(DataEntryContainer);

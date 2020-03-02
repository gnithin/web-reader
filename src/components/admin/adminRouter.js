import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import DataEntry from "./dataEntry";
import InvalidPage from "../invalidPage/InvalidPage";

class AdminRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/admin/pages" component={DataEntry}/>
                <Route path="*" component={InvalidPage}/>
            </Switch>
        );
    }
}

export default AdminRouter;
import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import DataEntry from "../components/admin/dataEntry";
import InvalidPage from "../components/invalidPage/InvalidPage";
import Howto from "../components/admin/howto";

class AdminRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/admin/pages" component={DataEntry}/>
                <Route path="/admin/howto" component={Howto}/>
                <Route path="*" component={InvalidPage}/>
            </Switch>
        );
    }
}

export default AdminRouter;

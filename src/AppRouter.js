import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Reader from 'components/reader'
import AdminRouter from "./components/admin/adminRouter";

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/admin/*"
                        component={AdminRouter}
                    />
                    <Route
                        path="*"
                        component={Reader}
                    />
                    <Route
                        exact
                        path="/"
                        component={Reader}
                    />

                </Switch>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
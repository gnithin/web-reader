import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Reader from 'components/reader'
import AdminRouter from "./adminRouter";
import ReaderComponentTest from "../components/readerComponents/componentTest.js";
import ReaderOptions from "../components/readerOptions";

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
                        exact
                        path="/reader"
                        component={ReaderOptions}
                    />

                    <Route
                        exact
                        path="/reader/:id"
                        component={Reader}
                    />

                    <Route
                        exact
                        path="/componentTest"
                        component={ReaderComponentTest}
                    />
                   
                </Switch>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
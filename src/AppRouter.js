import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Reader from 'components/reader'

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
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
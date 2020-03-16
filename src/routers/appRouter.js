import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Reader from 'components/reader'
import AdminRouter from "./adminRouter";
import ReaderComponentTest from "../components/readerComponents/componentTest.js";
import ReaderOptions from "../components/readerOptions";
import TagSearchBox from "../components/tagSearchBox";
import {connect} from "react-redux";
import PathActions from "../redux/actions/pathActions";

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
                        render={(props) => {
                            // Reset everything whenever this path is reached
                            this.props.resetPath();

                            return (
                                <ReaderOptions
                                    {...props}
                                />
                            )
                        }}
                    />

                    <Route
                        exact
                        path="/reader/:id"
                        component={Reader}
                    />

                    <Route
                        exact
                        path="/search"
                        component={TagSearchBox}
                    />

                    <Route
                        exact
                        path="/componentTest"
                        component={ReaderComponentTest}
                    />

                    {/* Redirect everything else to the home page */}
                    <Route
                        path="*"
                        render={() => {
                            return (<Redirect to="/reader"/>);
                        }}
                    />

                </Switch>
            </BrowserRouter>
        );
    }
}

const reduxToComponentMapper = (state) => {
    return {}
};

const componentToReduxMapper = (dispatch) => {
    return {
        resetPath: () => {
            dispatch(PathActions.resetPaths());
        },
    }
};

export default connect(reduxToComponentMapper, componentToReduxMapper)(AppRouter);
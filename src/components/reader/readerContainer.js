import React, { Component } from 'react'
import ReaderView from './readerView'
import Sidebar from 'components/sidebar'
import Breadcrumbs from 'components/breadcrumbs'

class ReaderContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <React.Fragment>
                <Breadcrumbs />
                <Sidebar />
                <ReaderView />
            </React.Fragment>
        );
    }
}
export default ReaderContainer;
import React, { Component } from 'react'
import Article from 'components/article'
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
                <Article />
            </React.Fragment>
        );
    }
}
export default ReaderContainer;
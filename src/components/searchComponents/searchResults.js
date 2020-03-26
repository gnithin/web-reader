import React, { Component } from 'react';
import {connect} from "react-redux";
import {Row} from "react-bootstrap";

import Utils from 'common/utils';

class SearchResult extends Component {
    render() {
        let searchResults = this.props.textArr.map((text) => {
            return (
                    <Row noGutters={true}>
                        <i class="fa fa-expand float-right" aria-hidden="true"></i>
                        <div className="text-truncate">
                            {this.props}
                        </div>
                    </Row>
                    );
        })

        return (
            <div>
                {searchResults}
            </div>
        );
    }

}

const reduxToComponentMapper = (state) => {
    let localTextArr = [];
    if (!Utils.isNull(state.search.data))
        localTextArr = state.search.data.map((val) => val.content)

    return {
        textArr: localTextArr
    }
}

export default connect(reduxToComponentMapper, null)(SearchResult);
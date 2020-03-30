import React, {Component} from 'react';

class TagSearchBoxView extends Component {
    render() {
        console.log(this.props.match.params)
        return (
            <div className="row">
                <div className="col" style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    marginTop: "20px",
                }}>
                    <h2>Tag Search View</h2>
                    <div>Page under construction. Please Try Later</div>
                </div>
            </div>
        );
    }
}

export default TagSearchBoxView;
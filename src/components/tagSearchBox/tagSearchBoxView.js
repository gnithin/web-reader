import React, {Component} from 'react';

class TagSearchBoxView extends Component {
    render() {
        console.log(this.props.match.params)
        return (
            <div>
                Tag Search View
            </div>
        );
    }
}

export default TagSearchBoxView;
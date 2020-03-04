import React, {Component} from 'react';
import './tagCreator.css'

class TagCreatorView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: ""
        };
    }

    render() {
        return (
            <input
                type="string"
                className="form-control"
                placeholder="Tags - Comma separated"
                value={this.state.tags}
                onChange={(e) => {
                    this.setState({tags: e.target.value})
                }}
                onBlur={(e) => {
                    this.props.updateTagsCb(this.state.tags);
                }}
            />
        );
    }
}

export default TagCreatorView;
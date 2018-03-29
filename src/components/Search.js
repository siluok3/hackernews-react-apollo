import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import Link from './Link';

class Search extends Component {

    state = {
        links: [],
        filter: '',
    };

    render() {
        return(
            <div>
                <div>
                    Type the Link you want to search
                    <input
                        onChange={e => this.setState({ filter: e.target.value })}
                        type="text"
                    />
                    <button
                        onClick={() => this._executeSearch()}
                    >
                        Search
                    </button>
                </div>
                {this.state.links.map((link, index) => <Link key={link.id} link={link} index={index} />)}
            </div>
        )
    }

    _executeSearch = async () => {
        //TODO implement
    }
}

export default withApollo(Search);
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Link from './Link';

class LinkList extends Component {
    render() {
        if(this.props.feedQuery && this.props.feedQuery.loading) {
            return <div>Φουρτώιν</div>
        }

        if(this.props.feedQuery && this.props.feedQuery.error) {
            return <div>Τι φκιαχς; Τγαήμσες τμαραφέτ</div>
        }

        const linksToRender = this.props.feedQuery.feed.links;

        return(
            <div>
                {linksToRender.map((link, index) => (
                    <Link key={link.id} updateStoreAfterVote={this._updateCacheAfterVote} index={index} link={link} />
                ))}
            </div>
        );
    }

    _updateCacheAfterVote = (store, createVote, linkId) => {
        //Read the current state of the cached data from FEED_QUERY from the store
        const data = store.readQuery({ query: FEED_QUERY });
        //Retrieve the link that was just voted, and reset votes to the votes returned by the server
        const votedLink = data.feed.links.find(link => link.id === linkId);
        votedLink.votes = createVote.link.votes;
        //Write in the cache(store) the modified data
        store.writeQuery({ query: FEED_QUERY, data});
    }
}

export const FEED_QUERY = gql`
  query FeedQuery {
      feed {
          links {
              id
              createdAt
              url
              description
              postedBy {
                  id
                  name
              }
              votes {
                  id
                  user {
                      id
                  }
              }
          }
      }
  }
`;
//wrap LinkList Component with FEED_QUERY
//define the prop name as feedQuery( data is the default)
export default graphql(FEED_QUERY, { name: 'feedQuery' }) (LinkList);
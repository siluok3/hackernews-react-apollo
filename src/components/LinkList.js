import React, { Component } from 'react';
import {  graphql } from 'react-apollo';
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

        const linksToRender = this.props.feedQuery.feed.links

        return(
            <div>
                { linksToRender.map(link => <Link key={link.id} link={link} />)}
            </div>
        );
    }
}

const FEED_QUERY = gql`
  query FeedQuery {
      feed {
          links {
              id
              createdAt
              url
              description
          }
      }
  } 
`;
//wrap LinkList Component with FEED_QUERY
//define the prop name as feedQuery( data is the default)
export default graphql(FEED_QUERY, { name: 'feedQuery' }) (LinkList);
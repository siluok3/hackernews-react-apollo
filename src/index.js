import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom';
import { ApolloLink, split } from 'apollo-client-preset';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { AUTH_TOKEN } from "./constants";
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

const middlewareAuthLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    const authorizationHeader = token ? `Bearer ${token}` : null;

    operation.setContext({
        headers: {
            authorization: authorizationHeader
        }
    });

    return forward(operation)
});

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);

//Creates the WebSocket Connection
const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000',
    options: {
        reconnect: true,
        connectionParams: {
            authToken: localStorage.getItem(AUTH_TOKEN),
        }
    },
});
//Route a request to a specific middleware link
//If the first argument of 'split' method returns TRUE then wsLink will be used( requested operation is a subscription)
//If the first argument of 'split' method returns FALSE then httpLinkWithAuthToken will be used(requested operation is query/mutation)
const link =  split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'Operation Definition' && operation === 'Subscription';
    },
    wsLink,
    httpLinkWithAuthToken,
);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});
//wrap with BrowserRouter so that child components of App will
//access the routing functionality
ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </BrowserRouter>
    , document.getElementById('root')
);
registerServiceWorker();

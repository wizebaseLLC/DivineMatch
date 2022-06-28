import React from 'react';
import {
  HttpLink,
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import useAwsAuth from '../api/hooks/useAwsAuth';

const ApolloWrapper: React.FC = props => {
  const { children } = props;
  const { authenticatedUser } = useAwsAuth();

  const httpLink = new HttpLink({
    uri: 'http://192.168.1.179:8080',
    headers: {
      auth: authenticatedUser?.jwtToken,
    },
  });

  const wsLink = new WebSocketLink({
    uri: `ws://192.168.1.179:8080`,
    options: {
      reconnect: true,
      connectionParams: {
        auth: authenticatedUser?.jwtToken,
      },
    },
  });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default ApolloWrapper;

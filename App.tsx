import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Drafts from './src/screens/feeds/drafts'

const client = new ApolloClient({ uri: 'http://localhost:4000' });



export default () => (
  <ApolloProvider client={client}>
    <Drafts />
  </ApolloProvider>
);


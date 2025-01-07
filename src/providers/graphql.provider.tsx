import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { createContext, ReactNode } from 'react';

import React from 'react';

const client = new ApolloClient({
  uri: 'http://localhost:5006/graphql',
  cache: new InMemoryCache()
});

export const GraphQLContext = createContext<ApolloClient<NormalizedCacheObject> | null>(
  null
);

function GraphqlProvider({children}: {children: ReactNode}) {
  return (
    <GraphQLContext.Provider value={client}>{children}</GraphQLContext.Provider>
  );
}

export default GraphqlProvider;
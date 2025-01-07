import { AxiosContext } from '@/providers/axios.provider';
import { AxiosInstance } from 'axios';
import { useContext } from 'react';
import { GraphQLContext } from '@/providers/graphql.provider';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

export const useGraphql = (): ApolloClient<NormalizedCacheObject> => {
  const context = useContext(GraphQLContext);
  if (!context) {
    throw new Error("useGraphql must be used within an AxiosProvider");
  }
  return context;
};

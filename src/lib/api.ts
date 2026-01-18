import { GraphQLClient } from 'graphql-request';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '';

export async function fetchGraphQL(query: string, { variables = {} } = {}) {
  const client = new GraphQLClient(API_URL);
  return client.request(query, variables);
}

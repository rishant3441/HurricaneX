import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://proxy.cors.sh/https://www.gasbuddy.com/graphql",
    cache: new InMemoryCache(),
    headers: {
      "content-type": "application/json",
      'x-cors-api-key': 'temp_aa1a6a2ae98ec6afbef4341e0d0b25e0'
    },
    fetchOptions: {
      mode: 'no-cors'
    }
  });
};

const client = createApolloClient();

export default client;
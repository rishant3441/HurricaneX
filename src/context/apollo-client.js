import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://hurricanex-cors-proxy-309d5f1e6306.herokuapp.com/https://www.gasbuddy.com/graphql",
    cache: new InMemoryCache(),
    headers: {
      "content-type": "application/json",
    },
    fetchOptions: {
      mode: 'no-cors'
    }
  });
};

const client = createApolloClient();

export default client;
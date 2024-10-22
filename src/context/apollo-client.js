import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://www.gasbuddy.com/graphql",
    cache: new InMemoryCache(),
  });
};

client = createApolloClient();

export default client;
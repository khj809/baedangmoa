import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client/core";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { getOperationAST } from "graphql";

import { authState } from "~/frontend/stores/auth";

const generateClient = () => {
  const cache = new InMemoryCache({
    addTypename: true,
  });
  const asyncAuthLink = setContext(async () => {
    const token = await authState.get().user?.getIdToken();
    return !!token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};
  });
  const httpLink = asyncAuthLink.concat(
    new HttpLink({
      uri: "https://baedangmoa.hasura.app/v1/graphql",
    })
  );

  const wsLink = new WebSocketLink({
    uri: "wss://baedangmoa.hasura.app/v1/graphql",
    options: {
      lazy: true,
      reconnect: true,
    },
  });

  const link = ApolloLink.split(
    (op: any) => {
      const operationAST = getOperationAST(op.query, op.operationName);
      return !!operationAST && operationAST.operation === "subscription";
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    cache,
    link,
    connectToDevTools: true,
  });
};

export default generateClient();

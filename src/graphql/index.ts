import { ApolloServer } from '@apollo/server';
import {User} from "./user"

async function createApolloGraphqlServer(){
      // Initialize Apollo Server with GraphQL schema and resolvers
  // required ke liye !
  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query {
        #   ${User.queries}
        hello: String
      }
       
      type Mutation {
        ${User.mutations}
      #  hello:String
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries
      },
      Mutation: {
        ...User.resolvers.mutations
      }
    },
  });

  // Start the GraphQL server
  await gqlServer.start();

  return gqlServer

}

export default createApolloGraphqlServer;
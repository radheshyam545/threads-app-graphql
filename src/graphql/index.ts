import { ApolloServer } from '@apollo/server';
import {User} from "./user"

async function createApolloGraphqlServer(){
      // Initialize Apollo Server with GraphQL schema and resolvers
  // required ke liye !
  const gqlServer = new ApolloServer({
    typeDefs: `

      ${User.typeDefs}

      type Query {
         ${User.queries}
        # getContext: String
        # hello: String
      }
       
      type Mutation {
        ${User.mutations}
      #  hello:String
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        // getContext:(_:any,parameter:any,context)=>{
        //   console.log("contextcontext",context);
        //   return "okay"
          
        // }

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
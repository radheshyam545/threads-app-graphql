import express, { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

// You can optionally use cors for handling cross-origin requests
// import cors from 'cors';

async function init() {
  const app = express();
  const PORT = process.env.PORT || 8000;

  // Middleware for parsing JSON bodies
  app.use(express.json());

  // Optionally, if you want to enable CORS (uncomment the next line)
  // app.use(cors());

  // Initialize Apollo Server with GraphQL schema and resolvers
  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String
        say(name: String): String
      }
    `,
    resolvers: {
      Query: {
        hello: () => 'Hey there! I am a GraphQL server.',
        say: (_: any, { name }: { name: string }) => `Hey ${name}, How are you?`,
      },
    },
  });

  // Start the GraphQL server
  await gqlServer.start();

  // Default route to check server health
  app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Server is up and running!' });
  });

  // Use Apollo Server middleware for handling /graphql requests
  // The expressMiddleware is a function that returns an Express-compatible middleware,
  // so we can directly apply it to the /graphql route
  app.use('/graphql', expressMiddleware(gqlServer as any));

  // Start the Express server
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
}

// Call the init function to start the server
init();

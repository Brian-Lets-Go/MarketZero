const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;
var server;
const startServer = async () => {
    server = new ApolloServer({
        typeDefs,
        resolvers,
        context: authMiddleware
    });
    await server.start();
    server.applyMiddleware({ app });
};


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
  
  startServer();
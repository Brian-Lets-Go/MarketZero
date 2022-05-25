const { gql } = require('apollo-server-express');

const typeDefs = gql`


    type Item {
        user: User
        _id: ID
        name: String
        description: String
        image: String
        price: Float
        condition_its_condition_is_in: String
        category: String
    }

    type User {
        _id: ID
        username: String
        email: String
        age: Int
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        items: [Item]
        item(_id: ID!): Item
    
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!, age: Int!): Auth
        login(email: String!, password: String!): Auth
        addItem(name: String!, description: String!, image: String, price: Float!, condition_its_condition_is_in: String!, category: String!): Item
    }
    
`;

module.exports = typeDefs;

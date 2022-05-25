const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID
    username: String
    email: String
    age: Int
    items: [Item]
}

type Item {
    _id: ID
    name: String
    description: String
    price: Float
    condition_its_condition_is_in: String
    category: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    users: [User]
    user(username: String): User
    items(username: String): [Item]
    item(_id: ID!): Item
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, age: Int!): Auth
    addItem(name: String!, description: String!, price: Float!, condition_its_condition_is_in: String!, category: String!): Item
}    
`;

module.exports = typeDefs;

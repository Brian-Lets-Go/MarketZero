const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Category {
        _id: ID
        name: String
    }

    type Condition {
        _id: ID
        name: String
    }

    type Item {
        _id: ID
        name: String
        description: String
        image: String
        price: Float
        condition_its_condition_is_in: Condition
        category: Category
    }

    type User {
        _id: ID
        username: String
        email: String
        items: Item
        age: Int
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        categories: [Category]
        items(category: ID): [Item]
        item(_id: ID!): Item
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!, age: Int!): Auth
        addItem(name: String!, description: String!, image: String, price: Float!, condition_its_condition_is_in: String!, category: String!): Item
    }
    
`;

module.exports = typeDefs;

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
    }

    type Query {
        users: [User]
        categories: [Category]
        items(category: ID): [Item]
        item(_id: ID!): Item
    }
    
`;

module.exports = typeDefs;

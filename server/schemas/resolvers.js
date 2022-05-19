const { AuthenticationError } = require('apollo-server-express');
const { User, Item, Category, Condition, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find();
        },
        categories: async () => {
            return await Category.find();
        },
        items: async (parent, { category, name }) => {
            const params = {};

            if (category) {
                params.category = category;
            }

            // if (name) {
            //     params.name = {
            //         $regex: name
            //     };
            // }

            return await Item.find(params).populate('category');
        },
        item: async (parent, { _id }) => {
            return await Item.findById(_id).populate('category');
        }
        // user: async (parent, args, context) => {
        //     if (context.user) {
        //         const user = await User.findById(context.user._id).populate({
        //             path: 'orders.products',
        //             populate: 'category'
        //         });

        //         user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        //         return user;
        //     }

        //     throw new AuthenticationError('Not logged in');
        // },
    }
    // Mutation: {
    //     addUser: async (parent, args) => {
    //       const user = await User.create(args);
    //       const token = signToken(user);
    
    //       return { token, user };
    //     }
    // }
};

module.exports = resolvers;
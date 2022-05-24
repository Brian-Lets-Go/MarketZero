const { AuthenticationError } = require('apollo-server-express');
const { User, Item, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({})
                    .select('-__v -password')
                    .populate('items')
    
                    return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return await User.find();
        },
        items: async (parent, { category, name }) => {
            const params = {};

            // if (category) {
            //     params.category = category;
            // }

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
    },
    Mutation: {
        addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);
    
          return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addItem: async (parent, args, context) => {
            if (context.user) {
                const item = await Item.create({ ...args, username: context.user.username});
                await User.findByIdAndUpdate(
                    { _id: context.user.id},
                    { $push: { items: item._id } },
                    { new: true }
                );

                return item;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;
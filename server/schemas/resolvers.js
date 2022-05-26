const { AuthenticationError } = require('apollo-server-express');
const { User, Item } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // me: async (parent, args, context) => {
        //     if (context.user) {
        //         const userData = await User.findOne({})
        //             .select('-__v -password')
        //             .populate('items')
    
        //             return userData;
        //     }
        //     throw new AuthenticationError('Not logged in');
        // },
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')

              return userData;
            }
      
            throw new AuthenticationError('Not logged in');
        },
        // users: async () => {
        //     return await User.find();
        // },
        users: async () => {
            return User.find()
              .select('-__v -password')
              .populate('items')
          },
        // items: async (parent, { category, name }) => {
        //     const params = {};

        //     // if (category) {
        //     //     params.category = category;
        //     // }

        //     if (user_id) {
        //         params.user_id =  user_id
        //     };

        //     return await Item.find(params).populate('category');
        // },
        user: async (parent, { username }) => {
            return User.findOne({ username })
              .select('-__v -password')
              .populate('items')
          },
        // item: async (parent, { _id }) => {
        //     return await Item.findById(_id).populate('category');
        // }
        items: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Item.find(params).sort({ createdAt: -1 });
          },
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
        item: async (parent, { _id }) => {
            return Item.findOne({ _id });
          }
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
        // addItem: async (parent, args, context) => {
        //     if (context.user) {
        //         const item = await Item.create({ ...args, username: context.user.username});
        //         return item;
        //     }
        //     throw new AuthenticationError('You need to be logged in!');
        // },
        addItem: async (parent, args, context) => {
            if (context.user) {
              const item = await Item.create({ ...args, username: context.user.username });
      
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { items: item._id } },
                { new: true }
              );
      
              return item;
            }
      
            throw new AuthenticationError('You need to be logged in!');
          },
    }
};

module.exports = resolvers;
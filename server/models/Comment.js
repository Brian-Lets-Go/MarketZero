const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema(
    {
      // writtenBy: {
      //   type: String,
      //   required: true
      // },
      commentBody: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
      toJSON: {
        getters: true
      },
      // id: false
    }
);


module.exports = commentSchema;

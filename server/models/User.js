const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
// const Item = require('./Item');

const userSchema = new Schema(
    {
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [ /.+@.+\..+/, 'that is not a valid email address']
    },
    age: {
        type: Number,
        required: true,
        min: 17
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
},
{
    toJSON: {
        virtuals: true
    }
});

userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
});
  
// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
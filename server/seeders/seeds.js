const faker = require('faker');

const db = require('../config/connection');
const { Item, User, Comment, Category, Condition } = require('../models');

// const itemData = require('./itemData.json');
// const userData = require('./userData.json');
// const commentData = require('./commentData.json');
// const categoryData = require('./categoryData.json');
// const conditionData = require('./conditionData.json');

db.once('open', async () => {
  // clean database
  await Item.deleteMany({});
  await User.deleteMany({});
  await Comment.deleteMany({});
  await Category.deleteMany({});
  await Condition.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  // create items
  let createdItems = [];
  for (let i = 0; i < 100; i += 1) {
    const itemText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdItem = await Item.create({ itemText, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { items: createdItem._id } }
    );

    createdItems.push(createdItem);
  }


  const createdUsers = await User.collection.insertMany(userData);

  // create comments
  for (let i = 0; i < 100; i += 1) {
    const commentBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomItemIndex = Math.floor(Math.random() * createdItems.length);
    const { _id: itemId } = createdItems[randomItemIndex];

    await Item.updateOne(
      { _id: itemId },
      { $push: { comments: { commentBody, username } } },
      { runValidators: true }
    );
  }
  // // bulk create each model
  // const comments = await Comment.insertMany(commentData);
  // const categories = await Category.insertMany(categoryData);
  // const conditions = await Condition.insertMany(conditionData);
  // const items = await Item.insertMany(itemData);
  // const users = await User.insertMany(userData);

  console.log('all done!');
  process.exit(0);
});
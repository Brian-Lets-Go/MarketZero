const db = require('../config/connection');
const { Item, User, Comment, Category, Condition } = require('../models');

const itemData = require('./itemData.json');
const userData = require('./userData.json');
const commentData = require('./commentData.json');
const categoryData = require('./categoryData.json');
const conditionData = require('./conditionData.json');

db.once('open', async () => {
  // clean database
  await Item.deleteMany({});
  await User.deleteMany({});
  await Comment.deleteMany({});
  await Category.deleteMany({});
  await Condition.deleteMany({});

  // bulk create each model
  const comments = await Comment.insertMany(commentData);
  const categories = await Category.insertMany(categoryData);
  const conditions = await Condition.insertMany(conditionData);
  const items = await Item.insertMany(itemData);
  const users = await User.insertMany(userData);

  console.log('all done!');
  process.exit(0);
});
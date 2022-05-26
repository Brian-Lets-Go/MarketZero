const db = require('../config/connection');
const { Item, User, Comment } = require('../models');

const itemData = require('./itemData.json');
const userData = require('./userData.json');

db.once('open', async () => {
  // clean database
  await Item.deleteMany({});
  await User.deleteMany({});
  

  const items = await Item.insertMany(itemData);
  // const users = await User.insertMany(userData);

  console.log('all done!');
  process.exit(0);
});
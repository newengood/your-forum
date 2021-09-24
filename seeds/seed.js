// sample seed files
// note!!: needs to be changed with model considerations

const sequelize = require('../config/connection');
const { User, Group} = require('../models');

const userData = require('./userData.json');
const groupData = require('./groupData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const group of groupData) {
    await Group.create({
      ...group,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();

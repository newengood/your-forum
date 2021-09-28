// sample seed files
// note!!: needs to be changed with model considerations

const sequelize = require('../config/connection');
const {
	User,
	Group,
	UserGroup,
	Topic,
	Post,
	Comment,
	Invitation,
} = require('../models');

const userData = require('./userData.json');
const groupData = require('./groupData.json');
const topicData = require('./topicData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');
const userGroupData = require('./userGroupData.json');
const invitationData = require('./invitationData.json');

const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	await User.bulkCreate(userData, {
		individualHooks: true,
		returning: true,
	});

	await Group.bulkCreate(groupData);
	await Topic.bulkCreate(topicData);
	await Post.bulkCreate(postData);
	await Comment.bulkCreate(commentData);
	await UserGroup.bulkCreate(userGroupData);
	await Invitation.bulkCreate(invitationData);

	process.exit(0);
};

seedDatabase();

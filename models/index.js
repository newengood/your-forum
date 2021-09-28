// insert model requirements here
const User = require('./User');
const Group = require('./Group');
const UserGroup = require('./UserGroup');
const Topic = require('./Topic');
const Post = require('./Post');
const Comment = require('./Comment');
const Invitation = require('./Invitation');

// insert model relationships here
/* User - Group (ownership)
    A user can create many groups;
    A group belongs to a single user. */
User.hasMany(Group, {
	foreignKey: 'user_id',
	onDelete: 'SET NULL', // If a user is deleted, don't delete groups they've created.
});
Group.belongsTo(User, {
	foreignKey: 'user_id',
});

/* User - Group (membership)
    A user belongs to many groups.
    A group can have many users. */
User.belongsToMany(Group, {
	through: UserGroup,
	as: 'memberships',
	foreignKey: 'user_id',
});
Group.belongsToMany(User, {
	through: UserGroup,
	as: 'memberships',
	foreignKey: 'group_id',
});

/* Group - Topic
    A group can have many topics.
    A topic belongs to a single group. */
Group.hasMany(Topic, {
	foreignKey: 'group_id',
});
Topic.belongsTo(Group, {
	foreignKey: 'group_id',
});

/* Topic - Post
    A topic can have many posts.
    A post belongs to a single topic. */
Topic.hasMany(Post, {
	foreignKey: 'topic_id',
	onDelete: 'SET NULL', // If a topic is deleted, don't delete posts in that topic.
});
Post.belongsTo(Topic, {
	foreignKey: 'topic_id',
});

/* Post - Comment
    A post can have many comments.
    A comment belongs to a single post. */
Post.hasMany(Comment, {
	foreignKey: 'post_id',
	onDelete: 'SET NULL', // If a post is deleted, don't delete comments made to that post.
});
Comment.belongsTo(Post, {
	foreignKey: 'post_id',
});

/* Post - User
    A post belongs to a single user.
    A user can have many posts. */
Post.belongsTo(User, {
	foreignKey: 'user_id',
});
User.hasMany(Post, {
	foreignKey: 'user_id',
});

/* Commment - User
    A comment belongs to a single user.
    A user can have many comments. */
Comment.belongsTo(User, {
	foreignKey: 'user_id',
});
User.hasMany(Comment, {
	foreignKey: 'user_id',
});

/* Invitation - User
    An invitation belongs to a single user.
    A user can have many invitations. */
Invitation.belongsTo(User, {
	foreignKey: 'user_id',
});
User.hasMany(Invitation, {
	foreignKey: 'user_id',
});

/* Invitation - Group
    An invitation belongs to a single group.
    A group can have many invitations. */
Invitation.belongsTo(Group, {
	foreignKey: 'group_id',
});
Group.hasMany(Invitation, {
	foreignKey: 'group_id',
});

module.exports = {
	User,
	Group,
	UserGroup,
	Topic,
	Post,
	Comment,
	Invitation,
};

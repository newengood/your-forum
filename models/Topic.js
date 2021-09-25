// template for topic model

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Topic extends Model {}

Topic.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		group_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'group',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		updatedAt: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'topic',
	}
);

module.exports = Topic;

// template for user-group junction/linking model

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserGroup extends Model {}

UserGroup.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		group_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'group',
				key: 'id',
			},
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		updatedAt: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'user_group',
	}
);

module.exports = UserGroup;

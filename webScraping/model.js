const Sequelize = require('sequelize');
const DB = require('./db');
// const { sequelize } = require('./config-sequelize');


const firstTable = DB.connection.define('info',
	{
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},

		link: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		},

		image: {
			type: Sequelize.TEXT,
			allowNull: true
		},
        
		title: {
			type: Sequelize.TEXT,
			allowNull: true
		},
        
		description: {
			type: Sequelize.TEXT('long'),
			allowNull: true
		},

		categories: {
			type: Sequelize.STRING,
			allowNull: true,
		}
	}
);

module.exports = { firstTable };
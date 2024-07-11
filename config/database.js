const { Sequelize } = require('sequelize');
require('dotenv').config();

const env = 'development'; // Assuming 'development' environment
const config = require('./config')[env]; // Assuming config file for different environments

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'ep-black-union-a46gglv2-pooler.us-east-1.aws.neon.tech',
  port: 5432,
  username: 'default',
  password: 'RVQathp0CP9s',
  database: 'verceldb',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // This line is important if your PostgreSQL server uses self-signed certificates
    }
  },
});

module.exports = sequelize;

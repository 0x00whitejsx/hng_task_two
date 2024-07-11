const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Adjust the path based on your project structure

const Organisation = sequelize.define('Organisation', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Name cannot be empty'
      },
      notEmpty: {
        msg: 'Name cannot be null'
      }
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Organisation',
  tableName: 'Organisations' // Adjust based on your actual table name in the database
});

Organisation.associate = function(models) {
  Organisation.belongsToMany(models.User, {
    through: 'UserOrganisation',
    foreignKey: 'organisationId',
    otherKey: 'userId',
    as: 'users'
  });
};

module.exports = Organisation;

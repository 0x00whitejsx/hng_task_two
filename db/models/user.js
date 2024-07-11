const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Adjust the path based on your project structure

const User = sequelize.define('User', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'First name cannot be empty'
      },
      notEmpty: {
        msg: 'First name cannot be null'
      }
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Last name cannot be empty'
      },
      notEmpty: {
        msg: 'Last name cannot be null'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'Email cannot be empty'
      },
      notEmpty: {
        msg: 'Email cannot be null'
      },
      isEmail: {
        msg: 'Invalid email format'
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Password cannot be empty'
      },
      notEmpty: {
        msg: 'Password cannot be null'
      }
    }
  },
  phone: {
    type: DataTypes.STRING
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
  modelName: 'User',
  tableName: 'Users' // Adjust based on your actual table name in the database
});

// User.associate = function(models) {
//     User.belongsToMany(models.Organisation, {
//       through: 'UserOrganisation',
//       foreignKey: 'userId',
//       otherKey: 'organisationId',
//       as: 'organisations'
//     });
//   };
  
module.exports = User;

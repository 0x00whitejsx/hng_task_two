// migrations/create-user-organisation.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserOrganisation', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      organisationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Organisations',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add composite unique constraint to ensure each user can only be associated with an organisation once
    await queryInterface.addConstraint('UserOrganisation', {
      type: 'unique',
      fields: ['userId', 'organisationId'],
      name: 'unique_user_organisation'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserOrganisation');
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('balances', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      limit: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      total_limit: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      max_limit: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      saved_limit: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      balance: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, _) => {
    return queryInterface.dropTable('balances');
  },
};

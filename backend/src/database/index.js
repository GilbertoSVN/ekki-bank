import Sequelize from 'sequelize';

import Users from '../app/models/Users';
import Accounts from '../app/models/Accounts';
import Favoreds from '../app/models/Favoreds';
import Balances from '../app/models/Balances';
import Transactions from '../app/models/Transactions';

import databaseConfig from '../config/database';

const models = [Users, Accounts, Transactions, Favoreds, Balances];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();

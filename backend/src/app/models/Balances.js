import Sequelize, { Model } from 'sequelize';

class Balances extends Model {
  static init(sequelize) {
    super.init(
      {
        limit: Sequelize.DECIMAL,
        total_limit: Sequelize.DECIMAL,
        max_limit: Sequelize.DECIMAL,
        saved_limit: Sequelize.DECIMAL,
        balance: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Balances;

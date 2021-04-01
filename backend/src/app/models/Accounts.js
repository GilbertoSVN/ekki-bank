import Sequelize, { Model } from 'sequelize';

class Accounts extends Model {
  static init(sequelize) {
    super.init(
      {
        account: Sequelize.INTEGER,
        formattedAccount: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${String(this.account).padStart(7, 0)}`;
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'user',
    });
    this.belongsTo(models.Balances, {
      foreignKey: 'balance_id',
      as: 'balance',
    });
  }
}

export default Accounts;

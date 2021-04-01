import Sequelize, { Model } from 'sequelize';

class Transactions extends Model {
  static init(sequelize) {
    super.init(
      {
        value: Sequelize.DECIMAL,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, {
      foreignKey: 'received_by',
      as: 'receiver',
    });
    this.belongsTo(models.Users, {
      foreignKey: 'sended_by',
      as: 'sender',
    });
  }
}

export default Transactions;

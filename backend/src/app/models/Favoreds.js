import Sequelize, { Model } from 'sequelize';

class Favoreds extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'favored',
    });
    this.belongsTo(models.Users, {
      foreignKey: 'favored_by',
      as: 'user',
    });
  }
}

export default Favoreds;

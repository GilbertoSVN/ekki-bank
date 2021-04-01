import * as Yup from 'yup';

import Users from '../models/Users';
import Accounts from '../models/Accounts';
import Balances from '../models/Balances';

class AccountsController {
  async index(req, res) {
    const { email } = req.params;

    if (email) {
      const user = await Users.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(400).json({ error: 'User does not exists' });
      }

      const account = await Accounts.findOne({
        where: {
          user_id: user.id,
        },
        include: [
          {
            model: Users,
            as: 'user',
            foreignKey: 'user_id',
          },
          {
            model: Balances,
            as: 'balance',
            foreignKey: 'balance_id',
          },
        ],
      });

      return res.json(account);
    } else {
      return res.status(400).json({ error: 'Invalid e-mail' });
    }
  }
}
export default new AccountsController();

import * as Yup from 'yup';

import Users from '../models/Users';
import Balances from '../models/Balances';
import Accounts from '../models/Accounts';

class BalancesController {
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

      const { balance_id } = await Accounts.findOne({
        where: {
          user_id: user.id,
        },
      });

      const balance = await Balances.findByPk(balance_id);

      return res.json(balance);
    } else {
      return res.status(400).json({ error: 'Invalid e-mail' });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      limit: Yup.number(),
      total_limit: Yup.number(),
      saved_limit: Yup.number(),
      balance: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const balances = await Balances.findByPk(id);

    if (!balances)
      return res.status(400).json({ error: 'Information not found' });

    const {
      limit,
      total_limit,
      saved_limit,
      max_limit,
      balance,
    } = await balances.update(req.body);

    return res.json({
      id,
      limit,
      total_limit,
      saved_limit,
      max_limit,
      balance,
    });
  }
}
export default new BalancesController();

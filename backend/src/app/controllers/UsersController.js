import * as Yup from 'yup';

import Users from '../models/Users';
import Balances from '../models/Balances';
import Accounts from '../models/Accounts';

class UsersController {
  async index(req, res) {
    const { id } = req.params;

    if (!id || typeof +id !== 'number') {
      return res.status(400).json({ error: 'Invalid User ID' });
    }

    const userExists = await Users.findByPk(id);

    if (!userExists) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    return res.json(userExists);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      cpf: Yup.string().required(),
      phone: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email, cpf, phone } = await Users.create(req.body);

    const newBalance = {
      limit: 500,
      total_limit: 500,
      max_limit: 500,
      saved_limit: 0,
      balance: 1000,
    };

    const { id: balanceId } = await Balances.create(newBalance);

    const { account } = await Accounts.create({
      user_id: id,
      balance_id: balanceId,
    });

    return res.json({
      id,
      name,
      email,
      cpf,
      phone,
      account,
      balanceId,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      user_id: Yup.number().required(),
      name: Yup.string(),
      email: Yup.string().email(),
      cpf: Yup.string(),
      phone: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, user_id } = req.body;

    const user = await Users.findByPk(user_id);

    if (email && email !== user.email) {
      const userExists = await Users.findOne({
        where: {
          email,
        },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    const { id, name, cpf, phone } = await user.update(req.body);

    return res.json({ id, name, email, cpf, phone });
  }
}
export default new UsersController();

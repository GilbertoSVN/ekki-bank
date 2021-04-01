import * as Yup from 'yup';
import { Op } from 'sequelize';
import { differenceInMinutes, subMinutes } from 'date-fns';

import Users from '../models/Users';
import Transactions from '../models/Transactions';
import Balances from '../models/Balances';
import Accounts from '../models/Accounts';

class TransactionsController {
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

      const transactions = await Transactions.findAll({
        where: {
          [Op.or]: [{ received_by: user.id }, { sended_by: user.id }],
        },
        include: [
          {
            model: Users,
            as: 'receiver',
            foreignKey: 'received_by',
          },
          {
            model: Users,
            as: 'sender',
            foreignKey: 'sended_by',
          },
        ],
      });

      return res.json(transactions);
    } else {
      return res.status(400).json({ error: 'Invalid e-mail' });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      sender_email: Yup.string().required(),
      receiver_email: Yup.string().required(),
      value: Yup.number().required(),
      limit: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { sender_email, receiver_email, value, limit } = req.body;

    if (value <= 0) {
      return res
        .status(400)
        .json({ error: "Can't transfer negative or 0 value" });
    }

    if (sender_email && receiver_email) {
      const sender_user = await Users.findOne({
        where: {
          email: sender_email,
        },
      });

      if (!sender_user) {
        return res.status(400).json({ error: 'User does not exists' });
      }

      const receiver_user = await Users.findOne({
        where: {
          email: receiver_email,
        },
      });

      if (!receiver_user) {
        return res.status(400).json({ error: 'User does not exists' });
      }

      const lastTransaction = await Transactions.findAll({
        where: {
          [Op.and]: [
            { received_by: receiver_user.id },
            { sended_by: sender_user.id },
          ],
          createdAt: { [Op.gte]: subMinutes(new Date(), 2) },
        },
        order: [['createdAt', 'DESC']],
      });

      if (lastTransaction) {
        const transaction = lastTransaction.find((t) => +t.value === +value);

        console.log('transaction      >>>>>>>>>>', transaction);

        if (transaction) {
          if (differenceInMinutes(new Date(), transaction.createdAt) <= 2)
            return res.status(400).json({
              error:
                'Wait at least 2 minutes before making another transaction for someone you already made a transaction',
            });
        }
      }

      const sender_account = await Accounts.findOne({
        where: {
          user_id: sender_user.id,
        },
      });

      const receiver_account = await Accounts.findOne({
        where: {
          user_id: receiver_user.id,
        },
      });

      const sender_balance = await Balances.findByPk(sender_account.balance_id);
      const receiver_balance = await Balances.findByPk(
        receiver_account.balance_id
      );

      if (+sender_balance.balance - value < 0)
        return res.status(400).json({ error: 'Insufficient founds' });

      await sender_balance.update({
        balance: +sender_balance.balance - value,
        limit,
      });

      await receiver_balance.update({
        balance: +receiver_balance.balance + value,
      });

      const { id, description } = await Transactions.create({
        sended_by: sender_user.id,
        received_by: receiver_user.id,
        value,
        description: `Transfered ${value / 100} from ${sender_user.name} to ${
          receiver_user.name
        }`,
      });

      return res.json({ id, description });
    } else {
      return res.status(400).json({ error: 'Invalid sender e-mail' });
    }
  }
}

export default new TransactionsController();

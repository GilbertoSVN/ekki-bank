import * as Yup from 'yup';

import Users from '../models/Users';
import Favoreds from '../models/Favoreds';
import { Op } from 'sequelize';

class FavoredsController {
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

      const favoreds = await Favoreds.findAll({
        where: {
          favored_by: user.id,
        },
        include: {
          model: Users,
          as: 'favored',
          foreignKey: 'user_id',
        },
      });

      return res.json(favoreds);
    } else {
      return res.status(400).json({ error: 'Invalid e-mail' });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      favored_email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, favored_email } = req.body;

    if (!email) return res.status(400).json({ error: 'Invalid user e-mail' });

    if (!favored_email)
      return res.status(400).json({ error: 'Invalid favored e-mail' });

    const user = await Users.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    const favored_user = await Users.findOne({
      where: {
        email: favored_email,
      },
    });

    if (!favored_user) {
      return res.status(400).json({ error: 'Favored user does not exists' });
    }

    const favoreds = await Favoreds.findOne({
      where: {
        favored_by: user.id,
        user_id: favored_user.id,
      },
    });

    if (favoreds)
      return res.status(400).json({ error: 'User is already favored' });

    const { id } = await Favoreds.create({
      favored_by: user.id,
      user_id: favored_user.id,
    });

    return res.json({ id, favored_by: user.id, user_id: favored_user.id });
  }

  async destroy(req, res) {
    const schema = Yup.object().shape({
      user_id: Yup.number().required(),
      favored_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { user_id, favored_id } = req.body;

    const favored = await Favoreds.findOne({
      where: {
        [Op.and]: [{ user_id: favored_id }, { favored_by: user_id }],
      },
    });

    if (!favored)
      return res.status(400).json({ error: 'Relation does not exists! ' });

    await favored.destroy();

    return res.status(200).json({ message: `Deletion completed.` });
  }
}
export default new FavoredsController();

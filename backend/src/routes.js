import { Router } from 'express';

import AccountsController from './app/controllers/AccountsController';
import BalancesController from './app/controllers/BalancesController';
import FavoredsController from './app/controllers/FavoredsController';
import TransactionsController from './app/controllers/TransactionsController';
import UsersController from './app/controllers/UsersController';

const routes = new Router();

routes.get('/users/:id', UsersController.index);
routes.post('/users/', UsersController.store);
routes.put('/users/', UsersController.update);

routes.get('/accounts/:email', AccountsController.index);

routes.get('/favoreds/:email', FavoredsController.index);
routes.post('/favoreds/', FavoredsController.store);
routes.delete('/favoreds/', FavoredsController.destroy);

routes.get('/balances/:email', BalancesController.index);
routes.put('/balances/:id', BalancesController.update);

routes.get('/transactions/:email', TransactionsController.index);
routes.post('/transactions', TransactionsController.store);

export default routes;

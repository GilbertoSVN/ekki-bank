import { Model, createServer } from 'miragejs';
import { users } from './mock/users';
import { balances } from './mock/balances';
import { transactions } from './mock/transactions';
import { favoreds } from './mock/favoreds';
import { accounts } from './mock/accounts';

export function createMirajeServer() {
  createServer({
    models: {
      users: Model,
      accounts: Model,
      balances: Model,
      transactions: Model,
      favoreds: Model,
    },

    seeds(server) {
      server.db.loadData({
        users,
        accounts,
        balances,
        transactions,
        favoreds,
      });
    },

    routes() {
      this.namespace = 'api';

      this.get('/users/:type/:id', (schema, request) => {
        const { type, id } = request.params;

        return schema.users.where((user) => user[type] === id);
      });

      this.get('/users', () => this.schema.all('users'));

      this.get('/balances/:id', (schema, request) => {
        const { id } = request.params;

        return schema.balances.where(
          (balance) => String(balance.userId) === String(id)
        );
      });

      this.get('/favoreds/:id', (schema, request) => {
        const { id } = request.params;

        return schema.favoreds.where(
          (favored) => String(favored.favoredBy) === String(id)
        );
      });

      this.delete('/favoreds/:id', (schema, request) => {
        const { id } = request.params;

        return schema.favoreds.find(id).destroy();
      });

      this.get('/transactions/:id', (schema, request) => {
        const { id } = request.params;

        return schema.transactions.where(
          (transaction) =>
            String(transaction.receivedBy) === String(id) ||
            String(transaction.sendedBy) === String(id)
        );
      });
    },
  });
}

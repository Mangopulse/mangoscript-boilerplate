import Knex from 'knex';
import knexConfig from '../../knexfile';

const env = process.env.NODE_ENV || 'development';
console.log(env);
const knexInstance = Knex(knexConfig[env]);

export default knexInstance;

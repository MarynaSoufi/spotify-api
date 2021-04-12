/**
 * import
 */
import knex from 'knex';
//database configurations
const dbConfig =  {
  client: 'sqlite3',
  connection: {
    filename: './src/db/spotify.db3'
  },
  useNullAsDefault: true
};
//initialization end export
const knexSpotify = knex(dbConfig);
export default knexSpotify;
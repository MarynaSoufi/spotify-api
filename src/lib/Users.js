/**
 * imports
 */
import knexSpotify from '../db/knexSpotify.js';
import bcrypt from 'bcrypt';

export default class Users {

  constructor() {
    this.table = "users";
  }

    /**
   * Get users or get user by id
   *
   * @param {null|string} id
   */
     async get(id = null) {
      try {
        if (!id) {
          return await knexSpotify(this.table).select("*");
        }
        const [user] = await knexSpotify(this.table).where("id", parseInt(id));
        return user;
      } catch (message) {
        console.error(message);
      }
    }
  
    /**
     * add new user
     * @param {*} name 
     * @param {*} email 
     * @param {*} password 
     * @param {*} isAdmin 
     * @returns 
     */
    async add(name, email, password, isAdmin) {
      try {
        //hashpassword
        const hash = bcrypt.hashSync(password, 10)
        return await knexSpotify(this.table).insert({ name: name, email: email, password: hash, isAdmin: 0,});
      } catch (message) {
        console.error(message);
      }
    }
    /**
     * update user
     * @param {*} id 
     * @param {*} name 
     * @param {*} email 
     * @param {*} password 
     * @returns 
     */
    async update(id, name, email, password) {
      try {
        const hash = bcrypt.hashSync(password, 10)
        return await knexSpotify(this.table).where("id", id).update({ name: name, email: email, password: hash});
      } catch(e) {
        console.error(e.message);
      }
    }
    async findOne(name) {
      try {
        return await knexSpotify(this.table)
          .where({ name: name })
          .select('*')
          .first();
      } catch (e) {
        return Logger.error(e.message);
      }
    }

    /**
     * add user for seeder
     * @param {*} field 
     * @returns 
     */
    async addSeeder(field) {
      try {
        return await knexSpotify(this.table).insert(field);
      } catch (message) {
        console.error(message);
      }
    }
    /**
     * delete user
     * @param {*} id 
     * @returns 
     */
    async delete(id) {
      try {
        return await knexSpotify(this.table).where("id", id).del();
      } catch(e) {
        console.error(e.message);
      }
    }
  }

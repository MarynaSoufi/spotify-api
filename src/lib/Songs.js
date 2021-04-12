/**
 * Writing and getting data from database
 */

import knexSpotify from '../db/knexSpotify.js';

export default class SongsDb {
  /**
   * Add a song to the database
   * @param {*} description 
   * @returns 
   */
  async add(name, artist, uri) {
      try {
         const songID = await knexSpotify('songs').insert({
            name: name,
            artist: artist,
            uri: uri

         });
          return songID;
      }catch (e){
          console.error(e.message);
      }
  }

   /**
 * Updates an existing song item
 *
 * @param {string} id
 * @param {string} description
 */
async update(id, name, artist, uri) {
  try {
    return await knexSpotify('songs').where("id", id).update({ name, artist, uri});
  } catch(e) {
    console.error(e.message);
  }
}

/**
 * Deletes a specific song
 *
 * @param {string} id
 */
async delete(id) {
  try {
    return await knexSpotify('songs').where("id", id).del();
  } catch(e) {
    console.error(e.message);
  }
}

/**
 * Get all the songs items
 */
 async get(id = null) {
  try {
    if (!id) {
      return await knexSpotify('songs').select("*");
    }
    const [song] = await knexSpotify('songs').where("id", parseInt(id));
    return song;
  } catch (message) {
    console.error(message);
  }
}
}
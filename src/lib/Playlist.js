import knexSpotify from '../db/knexSpotify.js';
import moment from "moment";

export default class PlaylistsDb {
  /**
   * Add a song to the playlist
   * @param {*} description 
   * @returns 
   */
  async add(name, userid) {
      try {
         const playlistID = await knexSpotify('playlists').insert({
             name: name,
             user_id: userid
         });
          return playlistID;
      }catch (e){
          console.error(e.message);
      }
  }

  /**
   * add a snong to the playlist
   * @param {*} playlistId 
   * @param {*} songId 
   */
  async addSong(playlistId, songId) {
    try {
       await knexSpotify('playlist_songs').insert({
           playlist_id: playlistId,
           song_id: songId
       });       
    }catch (e){
        console.error(e.message);
    }
  }

  /**
   * delete song from the playlist
   * @param {*} playlistId 
   * @param {*} songId 
   */
  async deleteSong(playlistId, songId) {
    try {
       await knexSpotify('playlist_songs')
       .where("playlist_id", playlistId)
       .where("song_id", songId)
       .del();       
    }catch (e){
        console.error(e.message);
    }
  }

   /**
 * Updates an existing playlist by user id
 *
 * @param {string} id
 * @param {string} description
 */
    async update(id, name, modifiedAt =  moment.utc().format('YYYY-MM-DD hh:mm:mm'), userId) {
      try {
        if (name) {
          return await knexSpotify('playlists').where("user_id", userId).where("id", parseInt(id)).update({ name, modifiedAt });
        }else {
          return await knexSpotify('playlists').where("user_id", userId).where("id", parseInt(id)).update({ modifiedAt });
        }
        
      } catch(e) {
        console.error(e.message);
      }
    }

/**
 * Delete a playlist by id
 *
 * @param {string} id
 */
async delete(userId, id) {
  try {
    return await knexSpotify('playlists').where("user_id", userId).where("id", parseInt(id)).del();
  } catch(e) {
    console.error(e.message);
  }
}

/**
 * Get all the playlists by user id
 */
 async get(userId, id = null) {
  try {
    if (!id) {
      return await knexSpotify('playlists').where("user_id", userId);
    }
    const [playlist] = await knexSpotify('playlists').where("user_id", userId).where("id", parseInt(id));
    return playlist;
  } catch (message) {
    console.error(message);
  }
}
/**
 * get all playlists (for test)
 */
async getAll() {
  try {
    return await knexSpotify('playlists');
  } catch (message) {
    console.error(message);
  }
}

/**
 * Get all songs by plailist
 * @param {*} id 
 * @returns 
 */

async getSongs(userId, id) {
  try {
    const playlist = (await knexSpotify('playlists').where("user_id", userId).where("id", parseInt(id)))[0];
    const songs = await knexSpotify('songs')
      .join("playlist_songs", "playlist_songs.song_id", "songs.id")
      .where("playlist_songs.playlist_id", id)
      .select("songs.*");
    playlist.songs = songs;
    return playlist;
  } catch(e) {
   console.error(e.message);
  }
}

}
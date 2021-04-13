import Playlist from "../../lib/Playlist.js";
import parsePlaylist from "../../helpers/parsePlaylist.js";
import parsePlaylistSong from "../../helpers/parsePlaylistSong.js";

const playlistsDb = new Playlist();
/**
 * get all songs in existing playlist
 * @param {*} req 
 * @param {*} res 
 */
export const getSongs = async (req, res) => {
  const playlistID = req.params.id;
  const userId = req.userId;
  const songs = await playlistsDb.getSongs(userId, playlistID);
  res.status(200).json(songs);
};

/**
 * get all playlists from user
 * @param {*} req 
 * @param {*} res 
 */
export const getPlaylists = async (req, res) => {
  const playlists = await playlistsDb.get(req.userId);
  res.status(200).json(playlists);
};
/**
 * get one playlist from user
 * @param {*} req 
 * @param {*} res 
 */
export const getPlaylist = async (req, res) => {
  try {
    const playlistID = req.params.id;
    console.log(playlistID);
    const playlist = await playlistsDb.get(req.userId, playlistID);
    if (!playlist) throw new Error("Playlist not found");
    res.status(200).json(playlist);
  } catch (message) {
    res.status(404).json({ error: message.toString() });
  }
};

/**
 * add a new playlist
 * @param {*} request 
 * @param {*} response 
 */
export const addPlaylist = async (request, response) => {
  try {
      const playlist = parsePlaylist(request);
      const { name , user_id } = playlist;
      const newPlaylist = await playlistsDb.add(name, user_id);
      response.status(201).json({ playlistsDb: newPlaylist});
  } catch({ message }) {
      response.status(500).json({ error: message });
  }
};
/**
* Update a playlist
*/
export const updatePlaylist = async (request, response) => {
  try {
      const playlist = parsePlaylist(request, response);
      const { name, user_id , modifiedAt} = playlist;
      const id = request.params.id;
      const updatePlaylist = await playlistsDb.update(id, name, modifiedAt, user_id);
      response.status(200).json({ playlistsDb: updatePlaylist });
  } catch({ message }) {
      response.status(500).json({ error: message});
  }
};

/**
 * delete a playlist
 * @param {*} request 
 * @param {*} response 
 */

export const deletePlaylist = async (request, response) => {
  try {
      const id = request.params.id;
      await playlistsDb.delete(request.userId,id);
      response.status(204).end();
  } catch({ message }) {
      response.status(500).json({ error: "message" });
  }
}

/**
 * add song to the playlist
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
export const addSong = async (request, response) => {
  try {
      const { playlistId, songId, userId} = parsePlaylistSong(request);
      //check whether playlist belongs to user with userId
      const playlist = await playlistsDb.get(userId, playlistId);
      const playlistSongs = await playlistsDb.getSongs(userId, playlistId);
      const {name} = request.body;
      const  {modifiedAt} = request.body;
      const songs = playlistSongs.songs.map((s) => {
        return s.id;
      })
      // console.log(songs);
      if(!playlist) {
        response.status(404).json({ error: `User doesn't have playlist with id ${playlistId}` });
        return;
      }
      if(songs.indexOf(songId) === -1) {
        await playlistsDb.addSong(playlistId, songId);
        await playlistsDb.update(playlistId, name, modifiedAt, userId);
        response.status(201).json({});
      }else {
        response.status(400).json({ error: `Playlist with id ${playlistId} alredy has a song with id ${songId}` });
      }
     
  } catch({ message }) {
      response.status(500).json({ error: message });
  }
};


/**
 * delete song from the playlist
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
export const deleteSong = async (request, response) => {
  try {
      const userId = request.userId;
      const { playlistId, songId,  } = request.params;
      const {name} = request.body;
      const  {modifiedAt} = request.body;
      //check whether playlist belongs to user with userId
      const playlist = await playlistsDb.get(userId, playlistId);
      if(!playlist) {
        response.status(404).json({ error: `User doesn't have playlist with id ${playlistId}` });
        return;
      }
      await playlistsDb.deleteSong(playlistId, songId);
      await playlistsDb.update(playlistId, name, modifiedAt, userId);
      response.status(200).json({});
  } catch({ message }) {
      response.status(500).json({ error: message });
  }
};
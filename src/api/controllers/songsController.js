import Songs from "../../lib/Songs.js";
import parseSong from "../../helpers/parseSong.js";

/* Variables */
const songsDB = new Songs();
/**
 * get all songs without authenticate
 * @param {*} req 
 * @param {*} res 
 */
export const getSongs = async (req, res) => {
  const songs = await songsDB.get();
  res.status(200).json(songs);
};
/**
 * get song by id without authenticate
 * @param {*} req 
 * @param {*} res 
 */
export const getSong = async (req, res) => {
  try {
    const songID = req.params.id;
    console.log(songID);
    const song = await songsDB.get(songID);
    if (!song) throw new Error("Song not found");
    res.status(200).json(song);
  } catch (message) {
    res.status(404).json({ error: message.toString() });
  }
};
/**
 * add a new song
 * @param {*} request 
 * @param {*} response 
 */
export const addSong = async (request, response) => {
  try {
      const song = parseSong(request);
      const { name, artist, uri} = song;
      const newSong = await songsDB.add(name, artist, uri);
      response.status(201).json({ songsDB: newSong});
  } catch({ message }) {
      response.status(500).json({ error: message });
  }
};

/**
* Update a  song 
*/
export const updateSong = async (request, response) => {
  try {
      const song = parseSong(request, response);
      const { name, artist, uri } = song;
      //const done = parseSong(request);
      const id = request.params.id;
      const updateSong = await songsDB.update(id, name, artist, uri);
      response.status(200).json({ songsDB: updateSong });
  } catch({ message }) {
      response.status(500).json({ error: message});
  }
};

export const deleteSong = async (request, response) => {
  try {
      const id = request.params.id;
      await songsDB.delete(id);
      response.status(204).end();
  } catch({ message }) {
      response.status(500).json({ error: message });
  }
}
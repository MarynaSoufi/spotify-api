/*
Import packages
*/
import express from "express";
import * as usersController from "../controllers/usersController.js";
import * as songsController from "../controllers/songsController.js";
import * as playlistsController from "../controllers/playlistsController.js";

/*
Make a router
*/
const router = express.Router();

/*
Register API endpoints for users
*/
//get all users(only for admiin)
router.get("/users/all", usersController.getUsers);
//singup for everyone
router.post("/users", usersController.addUser);
//get any user by id(for admin)
router.get("/users/:id", usersController.getUser);
//get own profile
router.get("/users", usersController.getUserSelf);
//update user(self)
router.put("/users", usersController.updateUser);
//delete user(self)
router.delete("/users", usersController.deleteUserSelf);
//delete user by id(for admin)
router.delete("/users/:id", usersController.deleteUser);

/*
Register API endpoints for songs
*/
//get all songs without authenicate
router.get("/songs", songsController.getSongs);
//get song by id without authenticate
router.get("/songs/:id", songsController.getSong);
//delete song by id(for admin)
router.delete("/songs/:id", songsController.deleteSong);
//add song(for admin)
router.post("/songs", songsController.addSong);
//update song(for admin)
router.put("/songs/:id", songsController.updateSong);
/**
 * Register API endpoints for playlists
 */
//get songs in existing playlist
router.get("/playlists/:id/songs", playlistsController.getSongs);
//get all playlists(for owner)
router.get("/playlists", playlistsController.getPlaylists);
//get playlist by id(fo owner)
router.get("/playlists/:id", playlistsController.getPlaylist);
//add new playlist
router.post("/playlists", playlistsController.addPlaylist);
//add song to playlist
router.post("/playlists/songs", playlistsController.addSong);
//update playlist
router.put("/playlists/:id", playlistsController.updatePlaylist);
//delete playlist
router.delete("/playlists/:id", playlistsController.deletePlaylist);
//delete song from playlist
router.delete("/playlists/:playlistId/songs/:songId", playlistsController.deleteSong);
// export router endpoints as api
export { router as api };
import UsersDB from '../src/lib/Users.js';
import SongsDB from '../src/lib/Songs.js';
import PlaylistsDB from '../src/lib/Playlist.js';

const UsersDb = new UsersDB();
const SongsDb = new SongsDB();
const PlaylistsDb = new PlaylistsDB();

describe('Dabase Users test o a sqlite3 database', () => {

  it('should return an array with all users', async() => {
    const users = await UsersDb.get();
    expect(Array.isArray(await UsersDb.get())).toBe(true);
    expect(users.length).toBeGreaterThan(50);
  })
});

describe('Dabase Songs test o a sqlite3 database', () => {

  it('should return an array with all songs', async() => {
    const songs = await SongsDb.get();
    expect(Array.isArray(await SongsDb.get())).toBe(true);
    expect(songs.length).toBeGreaterThan(20);
  })
});

// describe('Dabase Playlists test o a sqlite3 database', () => {

//   it('should return an array with all playlists', async() => {
//     expect(Array.isArray(await PlaylistsDb.get())).toBe(true);
//   })
// });
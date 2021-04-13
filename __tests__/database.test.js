import UsersDB from '../src/lib/Users.js';
import SongsDB from '../src/lib/Songs.js';
import PlaylistsDB from '../src/lib/Playlist.js';

const UsersDb = new UsersDB();
const SongsDb = new SongsDB();
const PlaylistsDb = new PlaylistsDB();

describe('Database Users test o a sqlite3 database', () => {

  it('should return an array with all users', async() => {
    const users = await UsersDb.get();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(50);
  })
});

describe('Database Songs test o a sqlite3 database', () => {

  it('should return an array with all songs', async() => {
    const songs = await SongsDb.get();
    expect(Array.isArray(songs)).toBe(true);
    expect(songs.length).toBeGreaterThan(20);
  })
});

describe('Database Playlists test o a sqlite3 database', () => {

  it('should return an array with all playlists', async() => {
    const playlists = await PlaylistsDb.getAll();
    expect(Array.isArray(playlists)).toBe(true);
  })
});
# SPOTIFY API
  -----
## INSTALATION
  -----

- npm install

##  SEEDER 
  -----
- npm run seed(50 users have already been added to the database via seeder)  

## TEST 
  -----
- npm test

## RUN 
  -----
- npm run dev

## WAT CAN BE DONE WITHOUT LOGIN 

- add new user to the database(method POST in the POSTMAN)
```
route: localhost:6002/api/users

what to write in the body: 

{ 
    "user":
    {
    "name": "user name",
    "email": "user email",
    "password": "user password"
    }
    
}
```
- get all songs(method GET in the POSTMAN)
```
route: localhost:6002/api/songs

```
Passwords are heashed automatically when a user is added(via POSTMAN or via seeder)

## WAT CAN USER DO

I have already added one user via POSTMAN(name: Freddy, password: 123freddy)
You only need to log in via POSTMAN and use the token in all subsequent actions of this user

- login(method POST in the POSTMAN)
```
route: localhost:6002/auth/login

what to write in the body:

 {
    "name": "Freddy",
    "password": "123freddy" 
   }

```
- get own profile(method GET in the POSTMAN)
```
route: localhost:6002/api/users
```

- update own profile(method PUT in the POSTMAN)
```
route: localhost:6002/api/users
```

- delete own profile(method DELETE in the POSTMAN)
```
route: localhost:6002/api/users
```

- get all songs(method GET in the POSTMAN)
```
route: localhost:6002/api/songs

```
- add new playlist(method POST in the POSTMAN)
```
route: localhost:6002/api/playlists

what to write in the body:

{
    "playlist": {
        "name": "choose a title for playlist"
    }
}

```

- get own playlists(method GET in the POSTMAN)
```
route: localhost:6002/api/playlists

```
- get own existing playlist bu id(method GET in the POSTMAN)
```
route: localhost:6002/api/playlists/id

(user Freddy has playlists with id(7, 8, 9))

```
- update own playlst by id(method PUT in the POSTMAN)
```
route: localhost:6002/api/playlists/id
what to write in the body: 
{
    "playlist":
    {
        "name": "new name"
    }
}

```

- delete own playlist by id (method DELETE in the POSTMAN)
```
route: localhost:6002/api/playlists/id

```

- get all songs in existing playlist(method GET in the POSTMAN)
```
route: localhost:6002/api/playlists/id/songs
```

- add song to the existing playlist(method POST in the POSTMAN)
```
route: localhost:6002/api/playlists/songs

what to write in the body: 
{
    "playlistId": id,
    "songId": id
}

```

- delete song from existing playlist(method DELETE in the POSTMAN)
```
route: localhost:6002/api/playlists/playlist_id/songs/song_id

```








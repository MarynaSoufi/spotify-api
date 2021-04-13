import request from 'supertest';
import { app } from '../src/app.js';

/**
 * TESTS FOR ADMIN
 */
describe('test our endpoints with HTTP-request', () => {

  let token ='';
/**
 * login
 */
  it('should return an access token', async (done) => {
    const response = await request(app)
      .post('/auth/login/')
      .send({ 
        name: "Marina",
        password: "marina" 
      })
      .set('Accept', 'application/json');

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;

    done();
  })

  /**
   * songs
   */

  //it works without login
  it('should return a list of songs', async (done) => {

    const response = await request(app)
      .get('/api/songs/')
      .set('Accept', 'application/json')
      //.set('Authorization', "Bearer " + token);

    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBe(true);

    done();
  });


  ///it works without login
  it('should return an existing song', async (done) => {
    const songId = '32';
    const response = await request(app)
      .get(`/api/songs/${songId}`)
      .set('Accept', 'application/json')
      // .set('Authorization', "Bearer " + token);
    expect(response.statusCode).toEqual(200);
    expect(typeof response).toBe('object');
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('artist');
    expect(response.body).toHaveProperty('uri');
    expect(response.body).toHaveProperty('createdAt');
    done();
  });

  it('should return status code 404 if a Song not found', async (done) => {
    const songId = 'unknown';
    const response = await request(app).get(`/api/songs/${songId}`).set('Accept', 'application/json');
    expect(response.statusCode).toEqual(404);
    expect(response.body).toHaveProperty('error');
    done();
  });

  
  it('should create a new song', async (done) => {
    const response = await request(app)
      .post('/api/songs/')
      .send({
        
          "song": 
          {
              "name": "test!!",
              "artist": "test!",
              "uri": "spotify:track:1TQXIltqoZ5XXyfCbA7894545test!!"
          } 
      
    }).set('Accept', 'application/json')
      .set('Authorization', "Bearer " + token);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('songsDB');
    done();
  });

  it('should update a song', async () => {
    const songId = '32';
    const response = await request(app)
      .put(`/api/songs/${songId}`)
      .send({
        "song": 
    {
        "name": "test(for update)",
        "artist": "delete",
        "uri": "spotify:track:1TQXIltqoZ5XXyfCbA58858455update"
    }
      }).set('Accept', 'application/json')
        
        .set('Authorization', "Bearer " + token);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('songsDB');
  });

  it('should delete a song', async (done) => {
    const songId = '36';
    const response = await request(app)
    .delete(`/api/songs/${songId}`)
    .set('Authorization', "Bearer " + token);
    expect(response.statusCode).toEqual(204);

    done();
  });

  /**
   * playlists
   */

   it('should return a list of playlists', async (done) => {

    const response = await request(app)
      .get('/api/playlists/')
      .set('Accept', 'application/json')
      .set('Authorization', "Bearer " + token);

    expect(response.statusCode).toEqual(200);

    done();
  });

  it('should return an existing playlist', async (done) => {
    const playlistId = '5';
    const response = await request(app)
      .get(`/api/playlists/${playlistId}`)
      .set('Accept', 'application/json')
      .set('Authorization', "Bearer " + token);
    expect(response.statusCode).toEqual(200);
    expect(typeof response).toBe('object');
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('modifiedAt');
    expect(response.body).toHaveProperty('user_id');
    done();
  });

  it('should return status code 404', async (done) => {
    const playlistId = 'unknown';
    const response = await request(app).get(`/api/playlists/${playlistId}`)
    .set('Accept', 'application/json')
    .set('Authorization', "Bearer " + token);
    expect(response.statusCode).toEqual(404);
    expect(response.body).toHaveProperty('error');
    done();
  });

    it('should update a playlist', async () => {
    const playlistId = '4';
    const response = await request(app)
      .put(`/api/playlists/${playlistId}`)
      .send({
        
          "playlist":
          {
              "name": "Relax(test)"
          }
      
      }).set('Accept', 'application/json')
        
        .set('Authorization', "Bearer " + token);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('playlistsDb');
  });

   it('should create a new playlist', async (done) => {
    const response = await request(app)
      .post('/api/playlists/')
      .send({
        
        
          "playlist": {
              "name": "TEST"
          }
      
      
    }).set('Accept', 'application/json')
      .set('Authorization', "Bearer " + token);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('playlistsDb');
    done();
  });

    it('should delete a playlist', async (done) => {
    const playlistId = '12';
    const response = await request(app)
    .delete(`/api/playlists/${playlistId}`)
    .set('Authorization', "Bearer " + token);
    expect(response.statusCode).toEqual(204);

    done();
  });

  /**
   * users
   */

   it('should return a list of users', async (done) => {

    const response = await request(app)
      .get('/api/users/all')
      .set('Accept', 'application/json')
      .set('Authorization', "Bearer " + token);

    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBe(true);

    done();
  });

  it('should return an existing user', async (done) => {
    const userId = '2';
    const response = await request(app)
      .get(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .set('Authorization', "Bearer " + token);
    expect(response.statusCode).toEqual(200);
    expect(typeof response).toBe('object');
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('isAdmin');
    expect(response.body).toHaveProperty('password');
    done();
  });

  //it works wothout login
   it('should create a new user ', async (done) => {
    const response = await request(app)
      .post('/api/users/')
      .send({
        
        "user":
        {
        "name": "test",
        "email": "test_burger@gmail.com",
        "password": "123test"
        }
      
    }).set('Accept', 'application/json')
      // .set('Authorization', "Bearer " + token);
    expect(response.statusCode).toEqual(201);
    done();
  });

  
    it('should delete a user', async (done) => {
    const userId = '54';
    const response = await request(app)
    .delete(`/api/users/${userId}`)
    .set('Authorization', "Bearer " + token);
    expect(response.statusCode).toEqual(204);

    done();
  });

     it('should update a user(self)', async () => {
    const response = await request(app)
    .post('/auth/login/')
      .send({ 
        name: "testforupdate",
        password: "123testforupdate" 
      })
      .set('Accept', 'application/json')
     

      const responsje = await request(app)
      .put(`/api/users/`)
      .send({
        
        "user": {
          "name": "updatedj",
          "email": "updatedje@gmail.com",
          "password": "123testforupdatej"
  
      }
      
      }).set('Accept', 'application/json')
        
        .set('Authorization', "Bearer " +  response.body.token);

    expect(responsje.statusCode).toEqual(200);
  });

  /**
   * TEST FOR USER
   */

   it('should return status code 500', async (done) => {
    const response = await request(app)
    .post('/auth/login/')
      .send({ 
        name: "Freddy",
        password: "123freddy" 
      })
      .set('Accept', 'application/json')

      const userId = '2';
      const responsje = await request(app)
      .delete(`/api/users/${userId}`)
      .set('Authorization', "Bearer " + response.body.token);
      expect(responsje.statusCode).toEqual(500);

    done();
  });
  


});

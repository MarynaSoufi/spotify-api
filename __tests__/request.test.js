import request from 'supertest';
import { app } from '../src/app.js';

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
  it('should return a list of songs', async (done) => {

    const response = await request(app)
      .get('/api/songs/')
      .set('Accept', 'application/json')
      .set('Authorization', "Bearer " + token);

    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBe(true);

    done();
  });

  it('should return an existing song', async (done) => {
    const songId = '30';
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

  
  // it('should create a new song', async (done) => {
  //   // const userId = 51;
  //   const response = await request(app)
  //     .post('/api/songs/')
  //     .send({
  //       name: "Sandy",
  //       artist: "marry",
  //       uri: "spotify:track:1TQXIltqoZ5XXyfCbA7895555"
  //   }).set('Accept', 'application/json')
  //     .set('Authorization', "Bearer " + token);
  //   expect(response.statusCode).toEqual(201);
  //   expect(response.body).toHaveProperty('id');
  //   songId = response.body.id;
  //   expect(response.body).toHaveProperty('createdAt');
  //   done();
  // });

  it('should update a song', async () => {
    const songId = '30';
    const response = await request(app)
      .put(`/api/songs/${songId}`)
      .send({
        name: "Sandyy",
        artist: "marryy",
        uri: "spotify:track:1TQXIltqoZ5XXyfCbA7895555"
      }).set('Accept', 'application/json')
        
        .set('Authorization', "Bearer " + token);

    expect(response.statusCode).toEqual(200);
  });

  // it('should delete a song', async (done) => {
  //   const songId = '30';
  //   const response = await request(app)
  //   .delete(`/api/songs/${songId}`)
  //   .set('Authorization', "Bearer " + token);
  //   expect(response.statusCode).toEqual(200);

  //   done();
  // });

  /**
   * playlists
   */

   it('should return a list of playlists', async (done) => {

    const response = await request(app)
      .get('/api/playlists/')
      .set('Accept', 'application/json')
      .set('Authorization', "Bearer " + token);

    expect(response.statusCode).toEqual(200);
    //expect(Array.isArray(response.body)).toBe(true);

    done();
  });

  it('should return an existing song', async (done) => {
    const songId = '30';
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


});

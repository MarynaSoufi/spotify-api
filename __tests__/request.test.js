import request from 'supertest';
import { app } from '../src/app.js';

describe('test our endpoints with HTTP-request', () => {

  let token ='';

  it('should return an access token', async (done) => {
    const response = await request(app)
      .post('/api/auth/login/')
      .send({ 
        name: "Marina",
        password: "marina" 
      })
      .set('Accept', 'application/json');

    expect(response.statusCode).toEqual(200);
    //expect(response.body).toHaveProperty('token');
    token = response.body.token;

    done();
  })

  it('should return a list of songs', async (done) => {
    const response = await request(app)
      .get('/api/songs/')
      .set('Accept', 'application/json')
      .set('Authorization', "Bearer " + token);

    expect(response.statusCode).toEqual(200);
    //expect(response.body).toHaveProperty('name'); 

    done();
  });

});

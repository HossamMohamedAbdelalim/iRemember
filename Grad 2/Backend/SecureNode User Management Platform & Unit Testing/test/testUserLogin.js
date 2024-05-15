import server from '../src/server.js';
import supertest from 'supertest';
import { expect } from 'chai';

const request = supertest(server);

describe('POST /users/login', function () {
  this.timeout(10000);

  // Test with correct credentials
  it('should login successfully with correct credentials', async function () {
    const response = await request
      .post('/users/login')
      .send({ name: "TA.Ahmed Mostafa", password: "ahmed2024" });

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body.message).to.equal('Login success');
  });

  // Test with incorrect password
  it('should fail to login with incorrect credentials', async function () {
    const response = await request
      .post('/users/login')
      .send({ name: "TA.Raghda", password: "MSAraghda11" }); // Incorrect password

    expect(response.status).to.equal(401);
    expect(response.body).to.be.an('object');
    expect(response.body.message).to.equal('Login failed');
  });
});
const supertest = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = require('../src/index');

const createAddressAndGetId = require('./util.function');

jest.setTimeout(30000);
describe('GET api/v1/address', () => {
  afterAll(async () => {
    await mongoose.connection.close();
    await mongoose.disconnect();
  });

  describe('Given all the address exists', () => {
    it('should return all address', async () => {
      const { body } = await supertest(app)
        .get('/api/v1/address')
        .expect(200);
      expect(body.success).toBe(true);
      expect(body.results).toBeTruthy();
      expect(body.count).toBeTruthy();
    });
  });
  describe('Given address Id does not exits', () => {
    it('should return 404', async () => {
      const { body } = await supertest(app)
        .get('/api/v1/address/625149854c82986e76cde4f9')
        .expect(404);
      expect(body.success).toBeFalsy();
      expect(body.message).toBe('this record does not exist');
    });
  });
  describe('Given the address Id exists', () => {
    it('should get one address by id and return 200', async () => {
      const _id = await createAddressAndGetId();
      const { body } = await supertest(app)
        .get(`/api/v1/address/${_id}`)
        .expect(200);
      expect(body.success).toBeTruthy();
      expect(body.results).toBeTruthy();
    });
  });
});

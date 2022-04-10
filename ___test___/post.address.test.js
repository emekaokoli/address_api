const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../src/index');

jest.setTimeout(30000);
describe('POST api/v1/address', () => {
   afterAll(async () => {
     await mongoose.connection.close();
     await mongoose.disconnect();
   });

  describe('Address is ready to be posted', () => {
    it('should create a new address and return 201', async () => {
      const { body } = await supertest(app)
        .post('/api/v1/address')
        .send({
          country: 'NL',
          city: 'Amsterdam',
          street: 'Koningin Wilhelminalaan',
          postalcode: '1071',
          number: '1',
          status: 'Not interested',
          name: 'John Doe',
          email: 'johndoe@gmail.com',
        })
        .expect(201);
        
      expect(body.success).toBe(true);
      expect(body.results).toBeTruthy();
    });
  });

  describe('Given an invalid data is entered', () => {
    it('should return validation error for country code', async () => {
      const { body } = await supertest(app)
        .post('/api/v1/address')
        .send({
          city: 'Amsterdam',
          street: 'Koningin Wilhelminalaan',
          postalcode: '1071',
          number: '1',
          numberAddition: '11234',
          status: 'interested',
          name: 'John Doe',
          email: 'johndoe@gmail.com',
        })
        .expect(400);

      expect(body.success).toBe(false);
      expect(body.message).toBe('"country" is required');
    });

    it('should return validation error when city is missing', async () => {
      const { body } = await supertest(app)
        .post('/api/v1/address')
        .send({
          country: 'NL',
          street: 'Koningin Wilhelminalaan',
          postalcode: '1071',
          number: '1',
          numberAddition: '',
          status: 'Not interested',
          name: 'John Doe',
          email: 'joghn@gmail.com',
        })
        .expect(400);

      expect(body.success).toBe(false);
      expect(body.message).toBe('"city" is required');
    });

    it('should return validation error when street is missing', async () => {
      const { body } = await supertest(app)
        .post('/api/v1/address')
        .send({
          country: 'NL',
          city: 'Amsterdam',
          postalcode: '1071',
          number: '1',
          numberAddition: '',
          status: 'Not interested',
          name: 'John Doe',
          email: '',
        })
        .expect(400);

      expect(body.success).toBe(false);
      expect(body.message).toBe('"street" is required');
    });

    it('should return validation error when postalcode is missing', async () => {
      const { body } = await supertest(app)
        .post('/api/v1/address')
        .send({
          country: 'NL',
          city: 'Amsterdam',
          street: 'Koningin Wilhelminalaan',
          number: '1',
          numberAddition: '',
          status: 'Not interested',
          name: 'John Doe',
          email: '',
        })
        .expect(400);

      expect(body.success).toBe(false);
      expect(body.message).toBe('"postalcode" is required');
    });

    it('should return validation error when number is missing', async () => {
      const { body } = await supertest(app)
        .post('/api/v1/address')
        .send({
          country: 'NL',
          city: 'Amsterdam',
          street: 'Koningin Wilhelminalaan',
          postalcode: '1071',
          numberAddition: '',
          status: 'Not interested',
          name: 'John Doe',
          email: '',
        })
        .expect(400);

      expect(body.success).toBe(false);
      expect(body.message).toBe('"number" is required');
    });
  });
});

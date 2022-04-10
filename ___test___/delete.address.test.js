const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../src/index');
const createAddressAndGetId = require('./util.function');

jest.setTimeout(30000);
describe('DELETE /api/v1/address', () => {
   afterAll(async () => {
     await mongoose.connection.close();
     await mongoose.disconnect();
   });

  describe('Delete a given address', () => {
    describe('Given a address does not exists', () => {
      it('should return 404 error when address Id is not found', async () => {
        const { body } = await supertest(app)
          .delete('/api/v1/address/625149854c82986e76cde4f9')
          .expect(404);
        expect(body.success).toBe(false);
        expect(body.message).toBe('id does not exist');
      });
    });
  });
  describe('Given input is bad request', () => {
    it('should return 400', async () => {
      const { body } = await supertest(app)
        .delete('/api/v1/address/123344')
        .expect(400);
      expect(body.success).toBe(false);
      expect(body.message).toBe(
        '"value" with value "123344" fails to match the valid mongo id pattern'
      );
    });
  });
  describe('Given an address exists', () => {
    it('should delete one address by id and return 204', async () => {
      const _id = await createAddressAndGetId();
      const {body} =await supertest(app)
        .delete(`/api/v1/address/${_id}`)
        .expect(200)
        expect(body.success).toBe(true);
      expect(body.message).toBe('address deleted successfully');
    });
  });
});

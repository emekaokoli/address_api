const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../src/index');

const createAddressAndGetId = require('./util.function');

jest.setTimeout(30000);
describe('PATCH api/v1/address', () => {
   afterAll(async () => {
     await mongoose.connection.close();
     await mongoose.disconnect();
   });

  describe('Update a given address', () => {
    describe('Given an address does not exists', () => {
      it('should return 404', async () => {
        const { body } = await supertest(app)
          .patch('/api/v1/address/625149854c82986e76cde4f9')
          .expect(404);
        expect(body.success).toBe(false);
        expect(body.message).toBe('Record not found');
      });
    });

    describe('Given user indicated "not interested" ', () => {
      it('should return 403', async () => {
        const _id = await createAddressAndGetId({
          status: 'not interested',
        });

        const { body } = await supertest(app)
          .patch(`/api/v1/address/${_id}`)
          .send({
            status: 'not interested',
          })
          .expect(403);
        expect(body.success).toBe(false);
        expect(body.message).toBe('user is not interested');
      });

      describe('Given an address exists ', () => {
        it('should update and return 200', async () => {
          const _id = await createAddressAndGetId();
          const { body } = await supertest(app)
            .patch(`/api/v1/address/${_id}`)
            .send({
              name: 'jamesBiden',
              status: 'interested',
              email: 'jamesBiden@gmail.com',
            });
          expect(body.success).toBe(true);
          expect(body.results).toBeTruthy();
        });
      });
    });
  });
});

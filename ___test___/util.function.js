const supertest = require('supertest');
const app = require('../src/index');

async function createAddressAndGetId(address={}) {
  const { body } = await supertest(app).post('/api/v1/address').send({
    country: 'NG',
    city: 'lagos',
    street: 'test',
    postalcode: '12345',
    number: '0805666726',
    status: undefined,
    name: 'john doe',
    email: 'test@gmail.com',
    ...address,
  });

  return body.results._id;
}

module.exports = createAddressAndGetId;
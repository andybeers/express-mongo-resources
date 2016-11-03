const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe('RESTful API for roasters resource', () => {

  before(done => {
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection() {
      const name = 'roasters';
      connection.db
        .listConnections({ name })
        .next((err, info) => {
          if (!info) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });

  const request = chai.request(app);
  const testRoaster = {
    name: 'Heart Roasters',
    locations: 2
  };

  it('Adds a roaster to the collection', done => {
    request
      .post('/api/roasters')
      .send(testRoaster)
      .then(res => {
        const roaster = res.body;
        assert.ok(roaster._id);
        testRoaster._id = roaster._id;
        testRoaster.__v = 0;
      })
      .catch(done);
  });

  it('Does something', () => {

  });

  it('Does something', () => {

  });
  
});
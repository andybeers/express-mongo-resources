const chai = require('chai');
const chaiHttp = require('chai-http');
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
        .listCollections({ name })
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
  const testRoaster2 = {
    name: 'Heart',
    locations: 5,
    __v: 0
  };

  it('Starts with empty collection', done => {
    request
      .get('/api/roasters')
      .then(res => {
        assert.deepEqual(res.body, []);
        done();
      })
      .catch(done);
  });

  it('Adds a roaster to the collection', done => {
    request
      .post('/api/roasters')
      .send(testRoaster)
      .then(res => {
        const roaster = res.body;
        assert.ok(roaster._id);
        testRoaster._id = roaster._id;
        testRoaster.__v = 0;
        done();
      })
      .catch(done);
  });

  it('Gets roaster by Id', done => {
    request
      .get(`/api/roasters/${testRoaster._id}`)
      .then(res => {
        const resRoaster = res.body;
        assert.deepEqual(resRoaster, testRoaster);
        done();
      })
      .catch(done);
  });

  it('Gets all roasters', done => {
    request
      .get('/api/roasters')
      .then(res => {
        assert.deepEqual(res.body, [ testRoaster ]);
        done();
      })
      .catch(done);
  });

  it('Updates a roaster with PUT', done => {
    request
      .put(`/api/roasters/${testRoaster._id}`)
      .send(testRoaster2)
      .then(res => {
        testRoaster2._id = testRoaster._id;
        assert.notDeepEqual(res.body, testRoaster2);
        done();
      })
      .catch(done);
  });

  after(done => {
    connection.close(done);
  });
  
});
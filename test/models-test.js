const Roaster = require('../lib/models/roaster');
const Varietal = require('../lib/models/varietal');
const assert = require('chai').assert;

describe('Roaster model', () => {

  it('Validates with name and locations', done => {

    const roaster = new Roaster({
      name: 'Ristretto',
      locations: 3
    });
    roaster.validate(err => {
      if (!err) done();
      else done(err);
    });

  });

  it('Requires name', done => {

    const roaster = new Roaster({
      locations: 5
    });
    roaster.validate(err => {
      assert.isOk(err, 'Name is required.');
      done();
    });

  });

  it('Enforces number type on locations', done => {

    const roaster = new Roaster({
      name: 'Coava',
      locations: 'ten'
    });
    roaster.validate(err => {
      assert.isOk(err, 'Locations must be a number');
      done();
    });

  });

  it('Sets default locations to 1', done => {

    const roaster = new Roaster({
      name: 'Coava'
    });
    roaster.validate(err => {
      assert.isNotOk(err);
      assert.equal(roaster.locations, 1);
      done();
    });

  });

});

describe('Varietal model', () => {

  it('Validates with name and regions', done => {

    const varietal = new Varietal({
      name: 'Bourbon',
      regions: ['this', 'that', 'the other']
    });
    varietal.validate(err => {
      if (!err) done();
      else done(err);
    });

  });

  it('Name is required', done => {

    const varietal = new Varietal({
      regions: ['this', 'that', 'the other']
    });
    varietal.validate(err => {
      assert.isOk(err, 'Name is required.');
      done();
    });

  });

  it('Expects regions to be an array', done => {

    const varietal = new Varietal({
      name: 'Caturra',
      regions: ['Latin America', 'Central America']
    });
    varietal.validate(err => {
      if (!err) done();
      else done(err);
    });

  });
  
});
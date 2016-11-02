const express = require('express');
const router = express.Router();
const bodyReader = require('../body-reader');
const Roaster = require('../models/roaster');

router
  .get('/', (req, res, next) => {
    Roaster.find()
      .then(roasters => res.send(roasters))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Roaster.find(req.params.id)
      .then(roaster => res.send(roaster))
      .catch(next);
  })

  .post('/', bodyReader, (req, res, next) => {
    new Roaster(req.body).save()
      .then(newRoaster => res.send(newRoaster))
      .catch(next);
  })

  .put('/:id', bodyReader, (req, res, next) => {
    Roaster.findByIdAndUpdate(req.params.id, req.body)
      .then(updated => res.send(updated))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Roaster.removeById(req.params.id)
      .then(deleted => res.write(deleted))
      .catch(next);
  });

  module.exports = router;
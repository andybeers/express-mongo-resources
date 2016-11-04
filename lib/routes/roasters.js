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
    Roaster.findById(req.params.id)
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
      .then(old => res.send(old))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Roaster.findByIdAndRemove(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  });

module.exports = router;
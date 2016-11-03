const express = require('express');
const router = express.Router();
const bodyReader = require('../body-reader');
const Varietal = require('../models/varietal');

router
  .get('/', (req, res, next) => {
    Varietal.find()
      .then(varietals => res.send(varietals))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Varietal.find(req.params.id)
      .then(varietals => res.send(varietals))
      .catch(next);
  })

  .post('/', bodyReader, (req, res, next) => {
    new Varietal(req.body).save()
      .then(newVarietal => res.send(newVarietal))
      .catch(next);
  })

  .put('/:id', bodyReader, (req, res, next) => {
    Varietal.findByIdAndUpdate(req.params.id, req.body)
      .then(updated => res.send(updated))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Varietal.findByIdAndRemove(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  });

module.exports = router;
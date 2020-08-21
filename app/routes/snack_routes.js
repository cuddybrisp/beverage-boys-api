const express = require('express')
const passport = require('passport')
const Snack = require('../models/snack')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// index
router.get('/snacks', requireToken, (req, res, next) => {
  Snack.find({ owner: req.user.id })
    .then(snack => {
      return snack.map(snack => snack.toObject())
    })
    .then(snack => res.status(200).json({ snack: snack }))
    .catch(next)
})
// show
router.get('/snacks/:id', requireToken, (req, res, next) => {
  Snack.findById(req.params.id)
    .then(handle404)
    .then(snack => res.status(200).json({ snack: snack.toObject() }))
    .catch(next)
})

// create
router.post('/snacks', requireToken, (req, res, next) => {
  console.log(req.body.snack)
  req.body.snack.owner = req.user.id
  Snack.create(req.body.snack)
    .then(snack => {
      res.status(201).json({ snack: snack.toObject() })
    })
    .catch(next)
})

// update
router.patch('/snacks/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.snack.owner
  Snack.findById(req.params.id)
    .then(handle404)
    .then(snack => {
      requireOwnership(req, snack)
      return snack.updateOne(req.body.snack)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
// delete
router.delete('/snacks/:id', requireToken, (req, res, next) => {
  Snack.findById(req.params.id)
    .then(handle404)
    .then(snack => {
      requireOwnership(req, snack)
      snack.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router

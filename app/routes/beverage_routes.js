const express = require('express')

const passport = require('passport')

const Beverage = require('../models/beverage')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// index
router.get('/beverages', requireToken, (req, res, next) => {
  Beverage.find()
    .then(beverage => {
      return beverage.map(beverage => beverage.toObject())
    })
    .then(beverage => res.status(200).json({ beverage: beverage }))
    .catch(next)
})

// show
router.get('/beverages/:id', requireToken, (req, res, next) => {
  Beverage.findById(req.params.id)
    .then(handle404)
    .then(beverage => res.status(200).json({ beverage: beverage.toObject() }))
    .catch(next)
})

// create
router.post('/beverages', requireToken, (req, res, next) => {
  req.body.beverage.owner = req.user.id
  Beverage.create(req.body.beverage)
    .then(beverage => {
      res.status(201).json({ beverage: beverage.toObject() })
    })
    .catch(next)
})

// update
router.patch('/beverages/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.beverage.owner
  Beverage.findById(req.params.id)
    .then(handle404)
    .then(beverage => {
      requireOwnership(req, beverage)
      return beverage.updateOne(req.body.beverage)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
// delete
router.delete('/beverages/:id', requireToken, (req, res, next) => {
  Beverage.findById(req.params.id)
    .then(handle404)
    .then(beverage => {
      requireOwnership(req, beverage)
      beverage.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router

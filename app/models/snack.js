const mongoose = require('mongoose')

const snackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  servings: {
    type: Number,
    required: true
  },
  finished: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Snack', snackSchema)

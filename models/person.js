/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')


var uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI

//console.log('connecting to', url)
var options = {
  server: {
    socketOptions: {
      keepAlive: 300000, connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  }
}
mongoose.connect(url, options, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    unique: true
  }
})
personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
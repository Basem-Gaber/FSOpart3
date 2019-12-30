/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))


morgan.token('my_post', function (req, res) {
  //console.log("here with")
  const body = req.body
  //console.log(JSON.stringify(body))
  if (req.method === 'POST')
    return JSON.stringify(req.body)
  return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :my_post'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

app.get('/api', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res, next) => {
  Person
    .find({})
    .then(persons => { res.json(persons.map(person => person.toJSON())) })
    .catch(error => next(error))
})
/*
app.get('/info', async function (req, res) {
  let count = 0
  Person.find({}, function (err, user) {
    if (err) { throw err; }
    count++
  })
    .then(res.write(`Phone book has info for ${count} people\n`))
  res.write(new Date().toString())
  res.end()
})
*/
app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  //const id = Number(req.params.id)
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  //console.log(body)
  //console.log(req.params)
  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

//const generateId = () => Math.floor(Math.random() * 100)

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  console.log('res from backend')
  if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    })
  }
  if (!body.number) {
    return res.status(400).json({
      error: 'number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(response => {
    console.log(`Added ${person.name} number ${person.number} to phonebook`)
  })
    .catch(error => next(error))

  res.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
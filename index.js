const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))


morgan.token('my_post', function (req, res) {
  //console.log("here with")
  const body = req.body
  //console.log(JSON.stringify(body))
  if (req.method === "POST")
    return JSON.stringify(req.body);
  return ""
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :my_post'))
//app.use(morgan('tiny'))

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]

/*
app.get('/', function(req, res){
  res.redirect('/api');
});
*/
app.get('/api', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.write(`Phone book has info for ${persons.length} people\n`)
  res.write(new Date().toString())
  res.end()
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons.filter(person => person.id === id)

  res.status(204).end()
})

const generateId = () => Math.floor(Math.random() * 100)

app.post('/api/persons', (req, res) => {
  const body = req.body
  //console.log(body)
  const found = persons.find(person => person.name === body.name)

  if (found) {
    return res.status(400).json({
      error: 'name must be unique'
    }
    )
  }
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

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
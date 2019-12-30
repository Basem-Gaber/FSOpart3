const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
//console.log(password)
const name = process.argv[3]
const number = process.argv[4]
const url =
    `mongodb+srv://basemm:${password}@cluster0-ggm4v.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })
    .catch(err => console.log(err))

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 4) {
    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(response => {
        console.log(`Added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    }).catch(err => {
        console.log(err)
        mongoose.connection.close()
    })
}
else {
    Person
        .find({})
        .then(persons => {
            persons.forEach(person => {
                console.log(person)
            })
            mongoose.connection.close()
        })
}
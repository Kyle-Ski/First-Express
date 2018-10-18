const express = require('express')
const app = express()
const port = 3333
const cors = require('cors')
const bodyParser = require('body-parser')
const people = require('./people')
const error = require('./error')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())



app.get('/', (req, res, next) => {
    res.json({people})
})
people.map((person, i) => {
    return app.get(`/${person.id}`, (req, res, next) => {
        res.json(people[i])
    })
})
app.get('/*', (req, res, next) => {
    res.json(error[0])
})
app.listen(port, () => console.log(`I got you on ${port}`))
const express = require('express')
const app = express()
const port = 3333
const cors = require('cors')
const bodyParser = require('body-parser')
const data = require('./people')
const error = require('./error')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())



app.get('/', (req, res, next) => {
    res.json({data})
})

app.get('/:index', (req, res, next) => {
    const id = req.params.index
    if(!(Number(id))){
        next()
    }
    const student = data.filter(student => student.id == id)[0]
    res.json({data: student})
})

app.use(notFound)
app.use(errorHandler)

function notFound(req, res, next) {
    res.status(404).send({error: 'Not found!', status: 404, url: req.originalUrl})
}

function errorHandler(err, req, res, next) {
    console.error('ERROR', err)
    const stack =  process.env.NODE_ENV !== 'production' ? err.stack : undefined
    res.status(500).send({error: err.message, stack, url: req.originalUrl})
}

app.listen(port, () => console.log(`I got you on http://localhost:${port}`))
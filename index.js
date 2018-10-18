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
    if (req.params.index <= data.length){
        res.send(data[req.params.index - 1])
    } else {
        res.status(404)
        res.redirect("https://http.cat/404")    
    }
})
app.listen(port, () => console.log(`I got you on http://localhost:${port}`))
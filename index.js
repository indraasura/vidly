const express = require('express')
const app = express()
const Joi = require('joi')
app.use(express.json())

const genres = [
    {id: 1, name: "horror"},
    {id: 2, name: "comedy"},
    {id: 3, name: "romance"},
    {id: 4, name: "drama"},
    {id: 5, name: "sci-fi"},
]

// Get routes
app.get('/', (req, res) => {
    res.send('Welcome to vidly')
})

app.get('/api/genres', (req, res) => {
    res.send(genres)
})

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id == parseInt(req.params.id))
    if(!genre) return res.status(404).send('Genre not found')
    res.send(genre)
})

// Post routes
app.post('/api/genres', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }
    const {error} = Joi.validate(req.body.name, schema)
    if (error) return res.status(400).send(error.details[0].message)
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre)
    res.send(genres)
})



app.listen(3000, ()=>console.log('Listening on port 3000...'))
const express = require('express')
const app = express()
const Joi = require('joi')
app.use(express.json())

const genres = [
    {id: 1, genre: "horror"},
    {id: 2, genre: "comedy"},
    {id: 3, genre: "romance"},
    {id: 4, genre: "drama"},
    {id: 5, genre: "sci-fi"},
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
        genre: Joi.string().min(3).required()
    }
    const {error} = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    }
    genres.push(genre)
    res.send(genres)
})

// Put routes
app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id == parseInt(req.params.id))
    if(!genre) return res.status(404).send('Genre not found')
    const schema = {
        genre: Joi.string().min(3).required()
    }
    const {error} = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    genre.genre = req.body.genre
    res.send(genre)
})

// Delete routes
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id == parseInt(req.params.id))
    if(!genre) return res.status(404).send('Genre not found')
    const index = genres.indexOf(genre)
    genres.splice(index, 1)
    res.send(genres)
})


validateGenre = genre => {
    const schema = {
        genre: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema)
}


app.listen(3000, ()=>console.log('Listening on port 3000...'))
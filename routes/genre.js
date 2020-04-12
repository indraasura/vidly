const express = require('express')
const router = express.Router()


const genres = [
    {id: 1, genre: "horror"},
    {id: 2, genre: "comedy"},
    {id: 3, genre: "romance"},
    {id: 4, genre: "drama"},
    {id: 5, genre: "sci-fi"},
]

router.get('/', (req, res) => {
    res.send(genres)
})

router.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id == parseInt(req.params.id))
    if(!genre) return res.status(404).send('Genre not found')
    res.send(genre)
})

// Post routes
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id == parseInt(req.params.id))
    if(!genre) return res.status(404).send('Genre not found')
    const index = genres.indexOf(genre)
    genres.splice(index, 1)
    res.send(genres)
})

module.exports = router
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Joi = require('joi')




const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}))



// const genres = [
//     {id: 1, genre: "horror"},
//     {id: 2, genre: "comedy"},
//     {id: 3, genre: "romance"},
//     {id: 4, genre: "drama"},
//     {id: 5, genre: "sci-fi"},
// ]




router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name')
    res.send(genres)
})

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id)
    if(!genre) return res.status(404).send('Genre not found')
    res.send(genre)
})

// Post routes
router.post('/', async (req, res) => {
    const schema = {
        genre: Joi.string().min(3).required()
    }
    const {error} = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let genre = new Genre({ genre: req.body.genre })
    genre = await genre.save()
    res.send(genre)
})

// Put routes
router.put('/:id', async (req, res) => {
    const {error} = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const genre = await Genre.findByIdandUpdate(req.params.id, { name: req.body.name }, { new: true })
    if(!genre) return res.status(404).send('Genre not found')
    const schema = {
        genre: Joi.string().min(3).required()
    }
    res.send(genre)
})

// Delete routes
router.delete('/:id', (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if(!genre) return res.status(404).send('Genre not found')
    res.send(genre)
})

module.exports = router
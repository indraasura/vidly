const express = require('express')
const app = express()
const Joi = require('joi')
app.use(express.json())
const genre = require('./routes/genre')
const home = require('./routes/home')
const mongoose = require('mongoose')
const customers = require('./routes/customers')

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to DB...'))
    .catch(err => console.error('Could not connect to DB...'))

app.use('/', home)
app.use('/api/genres' ,genre)
app.use('/api/customers', customers)

validateGenre = genre => {
    const schema = {
        genre: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema)
}

validateCustomer = customer => {
    const schema = {
        isGold: Joi.boolean().required(),
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(10).max(10).required()
    }
    return Joi.validate(customer, schema)
}


app.listen(3000, ()=>console.log('Listening on port 3000...'))
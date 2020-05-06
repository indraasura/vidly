const express = require('express')
const { Customers } = require('../models/customer') 
const router = express.Router()

// get routes
router.get('/', async (req, res) => {
    const customers = await Customers.find()
    res.send(customers)
})

router.get('/:id', async (req, res) => {
    const customer = await Customers.findById(req.params.id)
    if(!customer) return res.status(404).send("Customer doesn't exist")
    res.send(customer)
})

// post route

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body)
    if(error) return res.status(404).send(error.details[0].message)
    let customer = new Customers({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    })
    customer = await customer.save()
    res.send(customer)
})

// put route

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body)
    if(error) return res.status(404).send(error.details[0].message)
    const customer = await Customers.findByIdAndUpdate(req,params.id, { phone: req.body.phone }, { new: true })
    if(!customer) return res.status(404).send('Customer not found')
    res.send(customer)
})

// delete route
router.delete('/:id', async(req, res) => {
    const customer = await Customers.findByIdAndRemove(req.params.id)
    res.send(customer)
})

module.exports = router
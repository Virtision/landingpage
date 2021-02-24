const mongoose = require('mongoose');
const router = require('express').Router();
const Client = mongoose.model('Client');

router.get('/:id', (req, res) => {
    const clientId = req.params.id;
    Client.find({_id:clientId}, (err, client) => {
        res.send(client);
    })
});

router.post('/', (req, res) => {
    const {name, full_name, phone, email} = req.body;

    const client = new Client({
        name,
        full_name,
        phone,
        email
    });

    client.save();
    res.status(201);
    res.send({
        "Status":"Created"
    })
});

module.exports = router;

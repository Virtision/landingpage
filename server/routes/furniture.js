const mongoose = require('mongoose');
const router = require('express').Router();
const Furniture = mongoose.model('Furniture');

router.get('/:id', (req, res) => {
    const furnitureId = req.params.id;
    Furniture.find({_id:furnitureId}, (err, furniture) => {
        res.send(furniture);
    })
});

router.post('/', (req, res) => {
    const {name, type, model, material} = req.body;

    const furniture = new Furniture({
        name,
        type,
        model,
        material
    });

    furniture.save();
    res.status(201);
    res.send({
        "Status":"Created"
    })
});

module.exports = router;

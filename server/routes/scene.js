const mongoose = require('mongoose');
const router = require('express').Router();
const Scene = mongoose.model('Scene');

// the id for the demo scene
const DEMO_ID = 'demo';

// /scene should take users to the demo page
router.get('/', (req, res) => {
    Scene.find({id:DEMO_ID}, (err, scene) => {
        res.send(scene);
    })
});

router.get('/:id', (req, res) => {
    const sceneId = req.params.id;
    Scene.find({id:sceneId}, (err, scene) => {
        res.send(scene);
    })
});

// TODO: at some point should do authentication to post a scene
router.post('/', (req, res) => {
    const {id, info, user, exterior, rooms} = req.body;

    const scene = new Scene({
        id,
        info,
        user,
        exterior,
        rooms
    });

    scene.save();
    res.status(201);
    res.send({
        "Status":"Created"
    })
});

module.exports = router;

const mongoose = require('mongoose');
const router = require('express').Router();
const Log = mongoose.model('Log');

router.post('/', (req, res) => {
  const {ga_session_id, ga_client_id, type, host_domain, user:{position, rotation}, data} = req.body;

  const log = new Log({
    ga_session_id,
    ga_client_id,
    type,
    host_domain,
    user:{
      position,
      rotation
    },
    data
  });

  log.save();
    res.status(201);
    res.send({
    "Status":"Logged!"
  })
});

module.exports = router;

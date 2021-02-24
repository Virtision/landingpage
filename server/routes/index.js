const router = require('express').Router();

router.use('/api/scene', require('./scene'));
router.use('/api/furniture', require('./furniture'));
router.use('/api/contact', require('./contact'));
router.use('/api/client', require('./client'));
router.use('/api/log', require('./log'));
router.use('/api/log_dev', require('./log_dev'));

module.exports = router;

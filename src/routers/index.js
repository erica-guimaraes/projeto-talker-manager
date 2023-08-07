const router = require('express').Router();
const loginsRouter = require('./login.router');
const talkersRouter = require('./talker.router');

router.use('/talker', talkersRouter);
router.use('/login', loginsRouter);

module.exports = router;
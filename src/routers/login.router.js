const express = require('express');
const crypto = require('crypto');
const validationEmail = require('../middlewares/email');
const validationPassword = require('../middlewares/password');

const loginsRouter = express.Router();

function createToken() {
    return crypto.randomBytes(8).toString('hex');
}

loginsRouter.use(validationEmail, validationPassword);

loginsRouter.post('/', (req, res) => {
   const token = createToken();
    return res.status(200).json({ token });
});

module.exports = loginsRouter;

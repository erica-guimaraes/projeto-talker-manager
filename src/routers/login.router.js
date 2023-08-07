const express = require('express');
const crypto = require('crypto');

const loginsRouter = express.Router();

function createToken() {
    return crypto.randomBytes(8).toString('hex');
}

loginsRouter.post('/', (req, res) => {
   const token = createToken();
    return res.status(200).json({ token });
});

module.exports = loginsRouter;

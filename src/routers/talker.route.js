const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const serverTalker = express.Router();

const pathTalker = path.resolve(__dirname, '../talker.json');

async function getTalk() {
    const talkers = await fs.readFile(pathTalker, 'utf8');
    return JSON.parse(talkers);
}

serverTalker.get('/', async (req, res) => {
    const talkers = await getTalk();
    res.status(200).json(talkers);
});

module.exports = serverTalker;

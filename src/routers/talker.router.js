const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const talkersRouter = express.Router();

const pathTalker = path.resolve(__dirname, '../talker.json');

async function getTalk() {
    const talkers = await fs.readFile(pathTalker, 'utf8');
    return JSON.parse(talkers);
}

talkersRouter.get('/', async (req, res) => {
    const talkers = await getTalk();
    res.status(200).json(talkers);
});

talkersRouter.get('/:id', async (req, res) => {
    const talkers = await getTalk();
    const { id } = req.params;
    const person = talkers.find((per) => per.id === Number(id));
    if (!person) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    } 
    return res.status(200).json(person);
});

module.exports = talkersRouter;

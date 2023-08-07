const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const validationAuthorization = require('../middlewares/authorization');
const validationName = require('../middlewares/name');
const validationAge = require('../middlewares/age');
const { validationTalk, validationRate, validationWatchedAt } = require('../middlewares/talk');

const talkersRouter = express.Router();

const pathTalker = path.resolve(__dirname, '../talker.json');

async function getTalk() {
    const talkers = await fs.readFile(pathTalker, 'utf8');
    return JSON.parse(talkers);
}

async function writeJSON(talker) {
    await fs.writeFile(pathTalker, JSON.stringify(talker));
}

talkersRouter.get('/', async (_req, res) => {
    const data = await getTalk();
    res.status(200).json(data);
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

talkersRouter.post('/', validationAuthorization, validationName, validationAge, validationTalk, 
validationWatchedAt, validationRate, async (req, res) => {
    const talker = req.body;
    const data = await getTalk();
    const newTalker = {
        id: data.length + 1,
        ...talker,
    };
    data.push(newTalker);
    await writeJSON(data);
    res.status(201).json(newTalker);
});

module.exports = talkersRouter;

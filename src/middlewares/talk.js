const validationTalk = (req, res, next) => {
    const { talk } = req.body;

    if (!talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    if (talk.rate === 0) {
        return res.status(400).json({ message:
          'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    } 
    next();
};

const validationWatchedAt = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt } = talk;
    const regexData = /^(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/\d{4}$/;

    if (!watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!watchedAt.match(regexData)) {
        return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

const validationRate = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;

    if (!rate) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
        return res.status(400)
        .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    next();
};

module.exports = { validationTalk, validationWatchedAt, validationRate };
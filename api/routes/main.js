const express = require('express');
const router = express.Router();

const quiz = require('../svc/quiz');

/**
 * @swagger
 * tags:
 *   name: Main routers
 *   description: All routers from routers/main.js
 * /:limit/:category/:level
 *   get:
 *     summary: Get question from QUIZAPI
 *     tags: [Main routers]
 *     responses:
 *       200:
 *         description: Get question from QUIZAPI
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *          description: Data don't found
 *          content:
 *              application/json:
 *                  schema:
 *                      type: string
 */

const answer = [];
router.get('/:limit?/:category?/:level?',
async (req, res) => {

    const { limit, category, level } = req.params;
    console.log();
    const response = [];

    const question = await quiz.getQuestions(1, category, level);

    question.forEach(element => {
        response.push({
            question: element.question,
            multiple_correct_answers: element.multiple_correct_answers,
            answers: element.answers
        });

        answer.push({
            correct_answers: element.correct_answers,
            ip: req.socket.remoteAddress
        });

    });

    return res.status(200).send(response);
});


router.get('/answer',
async (req, res) => {
    const ip = req.socket.remoteAddress;
    const questionId = answer.findIndex(a => a.ip === ip);

    if (!questionId)
        return res.status(500).json("Dont found answer");

    res.status(200).send(answer[questionId]);

    answer.splice(questionId, 1);
});


module.exports = router;

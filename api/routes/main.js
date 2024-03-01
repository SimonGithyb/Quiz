const express = require('express');
const router = express.Router();

const quiz = require('../svc/quiz');

/**
 * @swagger
 * tags:
 *   name: Main routers
 *   description: All routers from routers/main.js
 *      /limit/category/level
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
router.get('/question/:limit?/:category?/:level?',
async (req, res) => {
    try {
        let { limit, category, level } = req.params;

        if (category === 'all')
            category = undefined;
    
        if (level === 'random')
            level = undefined;
    
        const response = [];
    
        const question = await quiz.getQuestions(limit, category, level);

    
        question.forEach(element => {
            const answers = Object.values(element.answers);
            response.push({
                question: element.question,
                multiple_correct_answers: element.multiple_correct_answers,
                answers: answers
            });

            const correct_answers = Object.values(element.correct_answers); 
            answer.push({
                correct_answers: correct_answers,
                ip: req.socket.remoteAddress
            });
    
        });
    
        return res.status(200).send(response);
    } catch(err) {
        console.error(err);
        res.status(500).json('Cannot get question/s');
    }

});


router.get('/answer/:answerIdx',
async (req, res) => {
    try {
        const ip = req.socket.remoteAddress;
        let { answerIdx } = req.params;
        answerIdx = Number(answerIdx);
        const questionId = answer.findIndex(a => a.ip === ip);
    
        if (isNaN(questionId))
            return res.status(500).json("Dont found answer");

        res.status(200).send(
            answer[questionId].correct_answers[answerIdx]
        );
    
        answer.splice(questionId, 1);
    } catch (err) {
        console.err(err);
        res.status(500).json('Cannot fount answer');
    }

});


module.exports = router;

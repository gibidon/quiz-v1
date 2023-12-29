const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = 3001;
const app = express();
const URL = 'mongodb://127.0.0.1:27017/quiz';

const {
	addQuestion,
	editQuestion,
	getQuestions,
	deleteQuestion,
} = require('./question.controller');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(
	express.urlencoded({
		extended: true,
	}),
);
app.use(express.json());
app.use(cors());

app.get('/edit', async (req, res) => {
	const questions = await getQuestions();
	res.send(questions);
});

app.put('/edit', async (req, res) => {
	const { questionId: id, title, options, correctAnswer } = req.body;

	try {
		await editQuestion(id, { title, options, correctAnswer });
	} catch (err) {
		console.log('editiong err', err);
	}
});

app.post('/edit', async (req, res) => {
	const { title, options, correctAnswer } = req.body;
	const totalQuestionQuantity = await getQuestions().length;

	try {
		await addQuestion({
			title,
			options,
			correctAnswer: Number(correctAnswer),
			number: totalQuestionQuantity + 1,
		});
	} catch (err) {
		console.log('adding question error', err);
	}
});

app.get('/questions/:id', async (req, res) => {
	const questions = await getQuestions();
	const totalQuestionQuantity = questions.length;

	res.json({ question: questions[req.params.id], totalQuestionQuantity });
});

app.delete('/:id', async (req, res) => {
	await deleteQuestion(req.body.id);
	console.log('deleted');
});

mongoose
	.connect(URL)
	.then(() => {
		console.log('connected to mongoDb!!!');

		app.listen(PORT, () => {
			console.log(`Server has been started on port ${PORT}...`);
		});
	})
	.catch((err) => console.log(`db connection error: ${err}`));

const express = require('express');
// const chalk = require('chalk');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const {
	addQuestion,
	editQuestion,
	getQuestion,
	getQuestions,
} = require('./question.controller');

const PORT = 3001;
const app = express();
const URL = 'mongodb://127.0.0.1:27017/quiz';

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(
	express.urlencoded({
		extended: true,
	}),
);
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
	console.log('hitting / ');
	res.json({ id: 44, title: 'some' });
});

app.get('/edit', async (req, res) => {
	const questions = await getQuestions();
	console.log('question in index to edit', questions);
	// await editQuestion();
	res.send(questions);
});

app.put('/edit', async (req, res) => {
	const { questionId: id, title, options, correctAnswer } = req.body;

	try {
		console.log(req.method, req.body.questionId);
		// await editQuestion(req.body.questionId, { title, options, correctAnswer });
		await editQuestion(id, { title, options, correctAnswer });
	} catch (err) {
		console.log('editiong err', err);
	}
});

app.get('/question/:id', async (req, res) => {
	// try {
	// 	await addQuestion({
	// 		number: req.params.id,
	// 		title: 'Самый популярный фреймворк на фронтенде?',
	// 		options: ['Vue', 'Svelte', 'React', 'Angular'],
	// 		correctAnswer: 2,
	// 	});
	// } catch (error) {
	// 	console.log('question adding error: ', err);
	// }

	// try {
	// 	const question = await getQuestion(req.params.id);
	// 	console.log('question in express', question);
	// } catch (err) {
	// 	console.log('extracting error: ', err);
	// }

	//question is found in database by number. Req.params.id === question number in db !!!
	const question = await getQuestion(req.params.id);

	res.json(question);
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

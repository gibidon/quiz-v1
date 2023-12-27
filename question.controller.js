// const chalk = require('chalk');
const Question = require('./models/Question');

async function addQuestion({ number, title, options, correctAnswer }) {
	await Question.create({
		number,
		title,
		options,
		correctAnswer,
	});
}

async function getQuestion(number) {
	const question = await Question.findOne({ number: number });
	return question;
}

async function getQuestions() {
	const questions = await Question.find({});
	console.log('questions extracted from db: ', questions);
	return questions;
}

async function editQuestion(id, updatedQuestion) {
	console.log('editiong in db...!');
	await Question.findByIdAndUpdate(id, updatedQuestion);
	console.log('after editing in db');
}
module.exports = { addQuestion, editQuestion, getQuestion, getQuestions };

const Question = require('./models/Question');

async function addQuestion({ title, options, correctAnswer, number }) {
	await Question.create({
		title,
		options,
		correctAnswer,
		number,
	});
}

async function getQuestion(number) {
	const question = await Question.findOne({ number: number });
	return question;
}

async function getQuestions() {
	const questions = await Question.find({});
	return questions;
}

async function editQuestion(id, updatedQuestion) {
	await Question.findByIdAndUpdate(id, updatedQuestion);
}

async function deleteQuestion(id) {
	await Question.findByIdAndDelete(id);
}
module.exports = {
	addQuestion,
	deleteQuestion,
	editQuestion,
	getQuestion,
	getQuestions,
};

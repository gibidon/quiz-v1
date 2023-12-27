const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
	number: { type: Number, required: true },
	title: { type: String, required: true },
	options: { type: Array, required: true },
	correctAnswer: { type: Number, required: true },
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;

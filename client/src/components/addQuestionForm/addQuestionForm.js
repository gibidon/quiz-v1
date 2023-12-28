import { useState } from 'react';
import styles from './addQuestionForm.module.css';

export const AddQiestionForm = () => {
	const [question, setQuestion] = useState({
		title: '',
		options: '',
		correctAnswer: null,
	});

	const handleInput = ({ target }) => {
		setQuestion({ ...question, [target.name]: target.value });
	};

	const addQuestionToDb = async ({ title, options, correctAnswer }) => {
		await fetch('http://127.0.0.1:3001/edit', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title,
				options,
				correctAnswer,
			}),
		});
	};

	return (
		<>
			<div>
				<label htmlFor="title" />
				<textarea
					id="title"
					placeholder="Введите текст вопроса..."
					name="title"
					onChange={handleInput}
				></textarea>
			</div>

			<div>
				<label htmlFor="options" />
				<textarea
					id="options"
					placeholder="Введите варианты вопросов через запятую"
					name="options"
					onChange={handleInput}
				></textarea>
			</div>

			<div>
				<label htmlFor="correctAnswer" />
				<input
					id="correctAnswer"
					placeholder="Введите единственный правильный вариант ответа"
					name="correctAnswer"
					onChange={handleInput}
				></input>
			</div>
			<button
				onClick={() => {
					addQuestionToDb({
						title: question.title,
						options: question.options.split(','),
						correctAnswer: question.correctAnswer,
					});
				}}
			>
				Сохранить вопрос
			</button>
		</>
	);
};

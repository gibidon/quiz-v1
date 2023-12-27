import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './questionEditForm.module.css';

export const QuestionEditForm = ({ question }) => {
	//TODO
	//need to change fields in db, make it like object {title,answer1,2,3,4,correctAnswer}
	// in order to make proper handleFormData function
	// console.log('question in form', question);

	// const [formData, setFormData] = useState({
	// 	title: question.title,
	// 	options: question.options,
	// 	correctAnswer: question.correctAnswer,
	// });
	const questionId = question._id;
	const [title, setTitle] = useState(question.title);
	const [options, setOptions] = useState(question.options);
	const [correctAnswer, setCorrectAnswer] = useState(question.correctAnswer);
	const navigate = useNavigate();

	// console.log('options: ', options);

	// const handleFormData = (e) => {
	// 	setFormData({...formData,[e.target.name] : e.target.value});
	// };

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleOptionsChange = (e, index) => {
		console.log('index to change', index, typeof index);
		console.log(e.target.value);
		// setOptions([...options, ...(options[index] = e.target.value)]);
		setOptions([
			...options.slice(0, index),
			e.target.value,
			...options.slice(index + 1),
		]);
	};

	const handleOptionRemove = (index) => {
		console.log('removing option ', index);
		setOptions([...options.slice(0, index), ...options.slice(index + 1)]);
	};

	const handleCorrectAnswer = (e) => {
		setCorrectAnswer(e.target.value);
	};

	const saveQuestionOnServer = async ({
		questionId,
		title,
		options,
		correctAnswer,
	}) => {
		fetch('http://127.0.0.1:3001/edit', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ questionId, title, options, correctAnswer }),
		});
	};

	return (
		<form
			className={styles.form}
			onSubmit={async (e) => {
				e.preventDefault();

				await saveQuestionOnServer({
					questionId,
					title,
					options,
					correctAnswer,
				});
				// navigate('/');
			}}
		>
			<div>
				Название вопроса:
				<input
					type="text"
					value={title}
					name={'title'}
					onChange={handleTitleChange}
				/>
			</div>
			<ul>
				{options.map((option, index) => (
					<li key={index}>
						<textarea
							// index={index}
							defaultValue={option}
							onChange={(e) => {
								// console.log('index,', index);
								handleOptionsChange(e, index);
							}}
						></textarea>
						<button onClick={() => handleOptionRemove(index)}>
							удалить вариант
						</button>
					</li>
				))}
			</ul>
			<div>
				Правильный ответ:
				{
					<input
						value={correctAnswer}
						name="correctAnswer"
						onChange={handleCorrectAnswer}
					/>
				}
			</div>
			<div className={styles.bottomButtons}>
				<button onClick={() => navigate(-1)}>Назад</button>
				<button type="submit">Сохранить</button>
			</div>
		</form>
	);
};

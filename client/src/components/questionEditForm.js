import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { ResizableInput } from '#components';
import styles from './questionEditForm.module.css';

export const QuestionEditForm = ({ question }) => {
	const questionId = question._id;
	const [title, setTitle] = useState(question.title);
	const [options, setOptions] = useState(question.options);
	const [correctAnswer, setCorrectAnswer] = useState(question.correctAnswer);
	// const [question, setQuestion] = useState({
	// 	title: question.title,
	// 	options: question.options,
	// 	correctAnswer: question.correctAnswer,
	// });
	const [isAdding, setIsAdding] = useState(false);
	const [addingOptionText, setAddingOptionText] = useState('');

	const navigate = useNavigate();

	// const handleQuestionChange = (e) => {
	// 	setQuestion({ ...question, [e.target.name]: e.target.value });
	// };

	function handleTitleChange(e) {
		setTitle(e.target.value);
	}

	const handleOptionsChange = (e, index) => {
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

	const editQuestionOnServer = async ({
		questionId,
		title,
		options,
		correctAnswer,
	}) => {
		await fetch('http://127.0.0.1:3001/edit', {
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

				await editQuestionOnServer({
					questionId,
					title,
					options,
					correctAnswer,
				});
			}}
		>
			<div>
				Название вопроса:
				<input
					type="text"
					value={title}
					name="title"
					onChange={handleTitleChange}
				/>
				{/* <ResizableInput
					initialValue={title}
					onTitleChange={handleTitleChange}
				/> */}
			</div>
			<ul className={styles.ul}>
				{options.map((option, index) => (
					<li key={index} className={styles.li}>
						<textarea
							defaultValue={option}
							onChange={(e) => {
								handleOptionsChange(e, index);
							}}
						></textarea>
						<button onClick={() => handleOptionRemove(index)}>
							Удалить вариант
						</button>
					</li>
				))}
			</ul>
			<div>
				<button onClick={() => setIsAdding(!isAdding)}>Добавить вариант</button>
			</div>
			{isAdding && (
				<>
					<input
						onChange={({ target }) => {
							setAddingOptionText(target.value);
						}}
					/>
					<button onClick={() => setOptions([...options, addingOptionText])}>
						Сохранить вариант
					</button>
				</>
			)}
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

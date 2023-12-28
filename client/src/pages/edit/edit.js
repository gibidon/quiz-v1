import { useState, useEffect } from 'react';
import { Dropdown, QuestionEditForm } from '#components';
import { AddQiestionForm } from '#components';
import styles from './edit.module.css';

export const Edit = () => {
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		async function getQuestionsFromFb() {
			const dbRequest = await fetch('http://127.0.0.1:3001/edit');
			const dbQuestions = await dbRequest.json();
			setQuestions(dbQuestions);
		}

		getQuestionsFromFb();
	}, []);
	console.log(questions);

	const removeQuestion = async (id) => {
		await fetch(`http://127.0.0.1:3001/${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id }),
		});
	};
	return (
		<>
			<h1>Страница редактирования вопросов</h1>

			{questions.map((question, index) => (
				// <div key={index} className={styles.editTemplate}>
				<div key={question._id} className={styles.editTemplate}>
					<div>Вопрос: {question.title}</div>
					<Dropdown key={question._id} buttonText="Открыть">
						<QuestionEditForm question={question} />
					</Dropdown>
					<button onClick={() => removeQuestion(question._id)}>
						Удалить вопрос
					</button>
				</div>
			))}

			<Dropdown buttonText="Добавить вопрос">
				<AddQiestionForm />
			</Dropdown>
		</>
	);
};

import { useState, useEffect } from 'react';
import { AddQiestionForm, Dropdown, QuestionEditForm } from '#components';
import styles from './edit.module.css';

export const Edit = () => {
	const [questions, setQuestions] = useState([]);
	const [shouldUpdate, setShouldUpdate] = useState(false);

	useEffect(() => {
		async function getQuestionsFromFb() {
			const dbRequest = await fetch('http://127.0.0.1:3001/edit');
			const dbQuestions = await dbRequest.json();
			setQuestions(dbQuestions);
		}

		getQuestionsFromFb();
	}, []);

	const removeQuestion = async (id) => {
		await fetch(`http://127.0.0.1:3001/${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id }),
		});
	};
	return (
		<div className={styles.container}>
			<h1 className={styles.h1}>Страница редактирования вопросов</h1>

			{questions.map((question, index) => (
				<div key={question._id} className={styles.editTemplate}>
					<div className={styles.questionTitle}>
						Вопрос {index + 1}: {question.title}
					</div>
					<Dropdown key={question._id} buttonText="Открыть">
						<QuestionEditForm question={question} />
					</Dropdown>
					<button
						onClick={async () => {
							await removeQuestion(question._id);
							setShouldUpdate(!shouldUpdate);
						}}
					>
						Удалить вопрос
					</button>
				</div>
			))}

			<Dropdown buttonText="Добавить вопрос">
				<AddQiestionForm />
			</Dropdown>
		</div>
	);
};

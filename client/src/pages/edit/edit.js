import { useState, useEffect } from 'react';
import { Dropdown, QuestionEditForm } from '#components';
import styles from './edit.module.css';
import { AddQiestionForm } from '../../components';

export const Edit = () => {
	// const [questions, setQuestions] = useState([{ number: null, title: '' }]);
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		async function getQuestionsFromFb() {
			const dbRequest = await fetch('http://127.0.0.1:3001/edit');
			const dbQuestions = await dbRequest.json();
			setQuestions(dbQuestions);
		}

		getQuestionsFromFb();
	}, []);

	return (
		<>
			<h1>Edit page</h1>

			{questions.map((question, index) => (
				<div key={index} className={styles.editTemplate}>
					<p>Вопрос: {question.title}</p>
					<Dropdown key={question._id} buttonText="Открыть">
						<QuestionEditForm question={question} />
					</Dropdown>
				</div>
			))}

			<Dropdown buttonText="Добавить вопрос">
				<AddQiestionForm />
			</Dropdown>
		</>
	);
};

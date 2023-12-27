import { useState, useEffect } from 'react';
// import { Dropdown } from '../../components';
import { Dropdown } from '#components';

export const Edit = () => {
	// const [questions, setQuestions] = useState([{ number: null, title: '' }]);
	const [questions, setQuestions] = useState([]);

	console.log(questions);

	useEffect(() => {
		async function getQuestionsFromFb() {
			const dbRequest = await fetch('http://127.0.0.1:3001/edit');
			const dbQuestions = await dbRequest.json();
			// console.log('dbQuestions in edit page', dbQuestions);
			setQuestions(dbQuestions);
		}

		getQuestionsFromFb();
	}, []);

	return (
		<>
			<h1>Edit page</h1>
			{/* {questions.map(({ number, title }) => (
				<div key={number}>
					{number}, {title}
				</div>
			))} */}
			{questions.map((question) => (
				<Dropdown key={question._id} question={question} />
			))}
		</>
	);
};

import { useState } from 'react';

export const AddOptionForm = ({ saveOption }) => {
	const [questionText, setQuestionText] = useState('');

	return (
		<form onSubmit={saveOption(questionText)}>
			<textarea
				value={questionText}
				onChange={({ target }) => setQuestionText(target.value)}
			></textarea>
			<button type="submit">Сохранить вариант</button>
		</form>
	);
};

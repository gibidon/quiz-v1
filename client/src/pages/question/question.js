import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const Question = () => {
	const [question, setQuestion] = useState({
		number: '',
		title: '',
		options: [],
		correctAnswer: null,
	});

	const params = useParams();
	const navigate = useNavigate();

	console.log(`answer${params.id}`);

	const [selectedOption, setSelectedOption] = useState(null);
	// console.log('params.id: ', params.id, typeof params.id);
	console.log('question: ', question);
	console.log('selected option: ', selectedOption);

	const saveUserAnswer = (selectedOption) => {
		const currentAnswers = JSON.parse(localStorage.getItem('userAnswers'));
		console.log('currentAnswers', currentAnswers);
		currentAnswers[params.id] = Number(selectedOption);
		localStorage.setItem('userAnswers', JSON.stringify(currentAnswers));
	};

	useEffect(() => {
		fetch(`http://127.0.0.1:3001/question/${params.id}`)
			.then((res) => {
				return res.json();
			})
			.then((question) => {
				setQuestion(question);
			})
			.catch((err) => console.log('question download error: ', err));
	}, [params.id]);

	return (
		<div>
			<form onSubmit={(e) => e.preventDefault()}>
				{/* params.id+1 simply for better UI */}
				<h1>Вопрос номер {Number(params.id) + 1}</h1>
				{question.title}
				<ul>
					{question.options.map((option, index) => (
						<li key={index}>
							{option}
							<input
								type="radio"
								value={option}
								name="radio"
								// TODO
								//here we need to make similar to db numbers,start from 0
								// onChange={({ target }) => setSelectedOption(target.value)}
								onChange={() => setSelectedOption(index)}
							/>
						</li>
					))}
				</ul>
				<div>
					<button
						onClick={() => {
							saveUserAnswer(selectedOption);
							navigate(`/question/${Number(params.id) - 1}`);
						}}
						disabled={params.id === '0'}
					>
						Предыдущий вопрос
					</button>
					{params.id === '4' ? (
						<button
							onClick={() => {
								saveUserAnswer(selectedOption);
								navigate('/result');
							}}
						>
							Завершить тест
						</button>
					) : (
						<button
							onClick={() => {
								saveUserAnswer(selectedOption);
								navigate(`/question/${Number(params.id) + 1}`);
							}}
							disabled={params.id === '4'}
						>
							Следующий вопрос
						</button>
					)}
				</div>
				Правильный ответ: {question.correctAnswer}
			</form>
		</div>
	);
};

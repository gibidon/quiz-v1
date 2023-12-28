import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const Question = () => {
	const [question, setQuestion] = useState({
		// number: '',
		title: '',
		options: [],
		correctAnswer: null,
	});
	const [totalQuestionQuantity, setTotalQuestionQuantity] = useState(null);
	const [selectedOption, setSelectedOption] = useState(null);

	const params = useParams();
	const navigate = useNavigate();

	const saveUserAnswer = (selectedOption) => {
		const currentAnswers = JSON.parse(localStorage.getItem('userAnswers'));
		currentAnswers[params.id] = Number(selectedOption);
		localStorage.setItem('userAnswers', JSON.stringify(currentAnswers));
	};

	// useEffect(() => {
	// 	fetch(`http://127.0.0.1:3001/question/${params.id}`)
	// 		.then((res) => res.json())
	// 		.then((question) => {
	// 			setQuestion(question);
	// 			console.log(question);
	// 		})
	// 		.catch((err) => console.log('question download error: ', err));
	// }, [params.id]);

	useEffect(() => {
		console.log('useeffect working!');
		fetch(`http://127.0.0.1:3001/questions/${params.id}`)
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
				{/* <h1>Вопрос номер {Number(params.id) + 1}</h1> */}
				<h1>
					Вопрос номер {Number(params.id) + 1} из {totalQuestionQuantity}
				</h1>
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
							// disabled={params.id === '4'}
						>
							Следующий вопрос
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

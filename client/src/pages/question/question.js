import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './question.module.css';

export const Question = () => {
	const [question, setQuestion] = useState({
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

	useEffect(() => {
		fetch(`http://127.0.0.1:3001/questions/${params.id}`)
			.then((res) => {
				return res.json();
			})
			.then(({ question, totalQuestionQuantity }) => {
				setQuestion(question);
				setTotalQuestionQuantity(totalQuestionQuantity);
			})
			.catch((err) => console.log('question download error: ', err));
	}, [params.id]);

	return (
		<div className={styles.container}>
			<form onSubmit={(e) => e.preventDefault()}>
				<h1 className={styles.questionHeader}>
					Вопрос номер {Number(params.id) + 1} из {totalQuestionQuantity}
				</h1>
				<div className={styles.title}>{question.title}</div>
				<ul className={styles.list}>
					{question.options.map((option, index) => (
						<li key={index} className={styles.li}>
							{option}
							<input
								type="radio"
								value={option}
								name="radio"
								onChange={() => setSelectedOption(index)}
							/>
						</li>
					))}
				</ul>
				<div>
					<button
						className={styles.prevBtn}
						onClick={() => {
							saveUserAnswer(selectedOption);
							navigate(`/question/${Number(params.id) - 1}`);
						}}
						disabled={params.id === '0'}
					>
						Предыдущий вопрос
					</button>
					{Number(params.id) === totalQuestionQuantity - 1 ? (
						<button
							className={styles.endBtn}
							onClick={() => {
								saveUserAnswer(selectedOption);
								navigate('/result');
							}}
						>
							Завершить тест
						</button>
					) : (
						<button
							className={styles.nextBtn}
							onClick={() => {
								saveUserAnswer(selectedOption);
								navigate(`/question/${Number(params.id) + 1}`);
							}}
							disabled={Number(params.id) === totalQuestionQuantity - 1}
						>
							Следующий вопрос
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

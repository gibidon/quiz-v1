import { useNavigate } from 'react-router-dom';
import { calculateResult } from '../../utils';
import { BasicButton } from '#components';
import styles from './result-page.module.css';

export const ResultPage = () => {
	const navigate = useNavigate();
	const currentAttemptNumber = localStorage.getItem('attempt');
	const userAnswers = JSON.parse(localStorage.getItem('userAnswers'));
	const currentResults = JSON.parse(localStorage.getItem('results'));
	const result = calculateResult(userAnswers);

	const saveResultToStorage = () => {
		const resultData = {
			attempt: currentAttemptNumber,
			date: new Date().toISOString().substring(0, 16).replace('T', ' '),
			correctAnswers: result,
			questionQuantity: userAnswers.length,
		};

		currentResults.push(resultData);
		localStorage.setItem('results', JSON.stringify(currentResults));
	};

	const setNextAttempt = () => {
		localStorage.setItem('attempt', Number(currentAttemptNumber) + 1);
	};

	saveResultToStorage();

	return (
		<div className={styles.container}>
			<div className={styles.result}>
				Правильных ответов: {result} из {userAnswers.length}
			</div>
			<div className={styles.buttons}>
				<BasicButton
					text="На главную"
					onClick={() => {
						setNextAttempt();
						navigate('/');
					}}
				/>
				<BasicButton
					text="Пройти тест заново"
					onClick={() => {
						setNextAttempt();
						navigate('/question/0');
					}}
				/>
			</div>
		</div>
	);
};

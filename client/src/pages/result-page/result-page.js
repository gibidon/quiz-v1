import { json, useNavigate } from 'react-router-dom';
import { calculateResult } from '../../utils';
import styles from './result-page.module.css';
import { useEffect, useState } from 'react';

// [3,2,0,0,2]

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
		<div>
			<div>
				Правильных ответов: {result} из {userAnswers.length}
			</div>
			<div className={styles.buttons}>
				<button
					onClick={() => {
						setNextAttempt();
						// saveResultToStorage();
						navigate('/');
					}}
				>
					На главную
				</button>
				<button
					onClick={() => {
						setNextAttempt();
						// saveResultToStorage();
						navigate('/question/0');
					}}
				>
					Пройти еще раз
				</button>
			</div>
		</div>
	);
};

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './home.module.css';

export const Home = () => {
	const [results, setResults] = useState([]);

	useEffect(() => {
		const resultsFromStorage = JSON.parse(localStorage.getItem('results'));
		setResults(resultsFromStorage);
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.controls}>
				<Link to={'/question/0'}>
					<button> Запустить тест</button>
				</Link>
				<Link to={'/edit'}>
					<button> Редактировать тест</button>
				</Link>
			</div>
			<div className={styles.progressInfo}>
				<h1>История прохождений</h1>
				{results.map(({ attempt, correctAnswers, date, questionQuantity }) => (
					<div key={attempt}>
						<div>
							Дата прохождения: {date} Номер попытки: {attempt}
						</div>
						<div>
							Верно: {correctAnswers} из {questionQuantity}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

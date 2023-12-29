import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { BasicButton } from '#components;
import { BasicButton } from '#components';
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
					{/* <button> Запустить тест</button> */}
					<BasicButton text={'Запустить текст'} />
				</Link>
				<Link to={'/edit'}>
					{/* <button> Редактировать тест</button> */}
					<BasicButton text={'Редактировать текст'} />
				</Link>
			</div>
			<div className={styles.progressInfo}>
				<h1>История прохождений</h1>
				{results.map(({ attempt, correctAnswers, date, questionQuantity }) => (
					<div key={attempt} className={styles.attempt}>
						<div>Дата прохождения: {date}</div>
						<div>Номер попытки: {attempt}</div>
						<div>
							Верно: {correctAnswers} из {questionQuantity}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

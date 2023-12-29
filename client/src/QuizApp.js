import { Routes, Route } from 'react-router-dom';
import { Edit, Home, Question, ResultPage } from './pages';
import './styles/reset.css';

export const QuizApp = () => {
	localStorage.setItem('attempt', '0');
	localStorage.setItem('userAnswers', JSON.stringify([]));
	localStorage.setItem('results', JSON.stringify([]));

	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/question/:id" element={<Question />} />
				<Route path="/edit" element={<Edit />} />
				<Route path="/result" element={<ResultPage />} />
				<Route path="*" element={<div>404</div>} />
			</Routes>
		</>
	);
};

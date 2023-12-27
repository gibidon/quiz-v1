// import { useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setUser } from './actions';
// import { Authorization, Home, Hotel, Registration } from './pages';
import { Edit, Home, Question, ResultPage } from './pages';

export const QuizApp = () => {
	localStorage.setItem('attempt', '0');
	localStorage.setItem('userAnswers', JSON.stringify([]));
	localStorage.setItem('results', JSON.stringify([]));
	// localStorage.setItem('resultQuantity', '0');

	// localStorage.setItem('answer1', null);
	// localStorage.setItem('answer2', null);
	// localStorage.setItem('answer3', null);
	// localStorage.setItem('answer4', null);

	// const dispatch = useDispatch();

	// useLayoutEffect(() => {
	// 	const currentUserDataJSON = sessionStorage.getItem('userData');

	// 	if (!currentUserDataJSON) {
	// 		return;
	// 	}

	// 	const currentUserData = JSON.parse(currentUserDataJSON);

	// 	dispatch(
	// 		setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) }),
	// 	);
	// }, [dispatch]);

	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				{/* <Route path="/login" element={<Authorization />} /> */}
				{/* <Route path="/register" element={<Registration />} /> */}
				<Route path="/question/:id" element={<Question />} />
				<Route path="/edit" element={<Edit />} />
				<Route path="/result" element={<ResultPage />} />
				{/* <Route path="/admin-page" element={<AdminPage />} /> */}
				<Route path="*" element={<div>404</div>} />
			</Routes>

			{/* <Modal/> */}
		</>
	);
};

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QuizApp } from './QuizApp';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	// <React.StrictMode>
	// <Provider store={store}>
	<BrowserRouter>
		<QuizApp />
	</BrowserRouter>,
	// </Provider>,
	// </React.StrictMode>,
);

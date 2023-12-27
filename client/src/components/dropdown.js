import { useState } from 'react';
import { QuestionEditForm } from './questionEditForm';
import styles from './dropdown.module.css';

export const Dropdown = ({ question }) => {
	const [dropdownState, setDropdownState] = useState(false);

	const handleDropdown = () => setDropdownState(!dropdownState);

	return (
		<div className={styles.dropdown}>
			<div>
				<button onClick={handleDropdown}>Click me!</button>
			</div>
			<div>{dropdownState && <QuestionEditForm question={question} />}</div>
		</div>
	);
};

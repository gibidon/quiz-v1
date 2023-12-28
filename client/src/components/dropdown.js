import { useState } from 'react';
// import { QuestionEditForm } from './questionEditForm';
// import styles from './dropdown.module.css';

export const Dropdown = ({ children, buttonText }) => {
	const [dropdownState, setDropdownState] = useState(false);

	const handleDropdown = () => setDropdownState(!dropdownState);

	return (
		<div>
			<div>
				<button onClick={handleDropdown}>{buttonText}</button>
			</div>
			<div>{dropdownState && children}</div>
		</div>
	);
};

import { useState } from 'react';

const ResizableInput = ({ initialValue, onTitleChange }) => {
	const [text, setText] = useState(initialValue);

	return (
		<input
			value={text}
			onChange={(e) => {
				setText(e.target.value);
				onTitleChange(e.target.value);
			}}
			style={{ width: `${text.length}ch` }}
		/>
	);
};

export default ResizableInput;

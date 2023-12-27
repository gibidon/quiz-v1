export const calculateResult = (userResults) => {
	console.log('received user results: ', userResults);
	const correctAnswers = [3, 2, 0, 0, 2];

	let result = 0;

	userResults.forEach((res, index) => {
		console.log(res, index);
		if (res === correctAnswers[index]) {
			result += 1;
		}
	});

	return result;
};

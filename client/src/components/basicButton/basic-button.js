import styles from './basic-button.module.css';

export const BasicButton = ({ text, ...props }) => {
	return (
		<button className={styles.button} {...props}>
			{text}
		</button>
	);
};

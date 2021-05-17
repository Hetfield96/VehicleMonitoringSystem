import chroma from 'chroma-js';

export const selectColorStyles = (controlWidth: number = 240) => {
	return {
		control: selectStyles => ({
			...selectStyles,
			backgroundColor: 'white',
			marginTop: 10,
			width: controlWidth,
			alignSelf: 'center'
		}),
		option: (selectStyles, {data, isDisabled, isFocused, isSelected}) => {
			const color = chroma(data.color);
			return {
				...selectStyles,
				backgroundColor: isDisabled
					? null
					: isSelected
						? data.color
						: isFocused
							? color.alpha(0.1).css()
							: null,
				color: isDisabled
					? '#ccc'
					: isSelected
						? chroma.contrast(color, 'white') > 2
							? 'white'
							: 'black'
						: data.color,
				cursor: isDisabled ? 'not-allowed' : 'default',

				':active': {
					...selectStyles[':active'],
					backgroundColor:
						!isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
				},
			};
		},
		multiValue: (selectStyles, {data}) => {
			const color = chroma(data.color);
			return {
				...selectStyles,
				backgroundColor: color.alpha(0.1).css(),
			};
		},
		multiValueLabel: (selectStyles, {data}) => ({
			...selectStyles,
			color: data.color,
		}),
		multiValueRemove: (selectStyles, {data}) => ({
			...selectStyles,
			color: data.color,
			':hover': {
				backgroundColor: data.color,
				color: 'white',
			},
		})
	}
};

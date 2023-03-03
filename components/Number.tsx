interface NumberProps {
	n: number;
}

const numbers = {
	'-': 'minus.png',
	0: '0.png',
	1: '1.png',
	2: '2.png',
	3: '3.png',
	4: '4.png',
	5: '5.png',
	6: '6.png',
	7: '7.png',
	8: '8.png',
	9: '9.png',
};

const Number = ({ n }: NumberProps) => {
	let digits: string[];

	if (n < -99) {
		digits = ['-', '9', '9'];
	} else {
		digits = n.toString().padStart(3, '0').split('');
	}

	return (
		<div style={{ display: 'inline-flex', userSelect: 'none' }}>
			{digits.map((digit, index) => (
				<img
					key={index}
					src={`/timer/${numbers[digit as keyof typeof numbers]}`}
				/>
			))}
		</div>
	);
};

export default Number;

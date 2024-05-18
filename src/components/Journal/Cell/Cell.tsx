import { FC } from 'react';

import styles from './Cell.module.scss'

interface CellParams {
	number: number
}

const Cell: FC<CellParams> = ({number}) => {

	console.log('number',number);
	

	return (
		<div className={styles.cell}>
			{number}
		</div>
	)
}

export default Cell
import React from 'react';
import Map from './Map';
import '../style/Main.css';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Schedule from './Schedule';

const Main = ({ history }) => {
	const city = useSelector(state => state.city.name);

	return (
		<main className='main'>
			<Map />
			<aside className='aside blur'>
				{city && <h3>{city}</h3>}
				<Schedule />
			</aside>

			<Button
				className='btn-home'
				type='primary'
				shape='circle'
				size='large'
				icon={<HomeOutlined />}
				onClick={() => history.push('/')}
			/>
		</main>
	);
};

export default withRouter(Main);

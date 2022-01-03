import React from 'react';
import Map from './Map';
import '../style/Main.css';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import Schedule from './Schedule';

const Main = ({ history }) => {
	return (
		<main className='main'>
			<Map />
			<aside className='aside blur'>
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

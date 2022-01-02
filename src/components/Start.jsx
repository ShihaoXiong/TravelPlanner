import { Button } from 'antd';
import React from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import '../style/Start.css';

const Start = ({ history }) => {
	return (
		<div className='start flex'>
			<h1 className='start__text up'>TravelPlanner</h1>
			<h1 className='start__text down'>TravelPlanner</h1>
			<Button ghost shape='round' size='large' className='start__btn' onClick={() => history.push('/home/login')}>
				Click to Start
			</Button>
		</div>
	);
};

export default withRouter(Start);

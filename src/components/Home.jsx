import React, { useState } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Button } from 'antd';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Range from './Range';
import Header from './Header';
import Start from './Start';
import '../style/Home.css';

const Home = ({ history }) => {
	const [initOffset, setInitOffset] = useState(0);
	const upadteOffset = newVal => setInitOffset(newVal);

	return (
		<div className='home flex'>
			<Header />
			<Start initOffset={initOffset} upadteOffset={upadteOffset}>
				<Route
					exact
					path='/'
					render={() => (
						<Button ghost shape='round' size='large' onClick={() => history.push('/home/login')}>
							Click to Start
						</Button>
					)}
				/>
				<Route path='/home/login' render={() => <LoginForm />} />
				<Route path='/home/signup' render={() => <SignupForm />} />
				<Route path='/home/range' render={() => <Range />} />
			</Start>

			{/* {Routes.map(item => (
				<Route key={item.path} path={item.path} render={() => <Start>{item.component}</Start>} />
			))} */}
			<div className='bg'></div>
		</div>
	);
};

export default withRouter(Home);

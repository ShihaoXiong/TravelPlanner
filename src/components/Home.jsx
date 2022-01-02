import React from 'react';
import { Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Range from './Range';
import '../style/Home.css';
import Header from './Header';
import Start from './Start';

const Home = () => {
	return (
		<div className='home flex'>
			<Header />
			<Route exact path='/' component={Start} />
			<Route path='/home/login' component={LoginForm} />
			<Route path='/home/signup' component={SignupForm} />
			<Route path='/home/range' component={Range} />
			<div className='bg'></div>
		</div>
	);
};

export default Home;

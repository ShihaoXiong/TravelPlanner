import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Range from './Range';
import '../style/Home.css';
import Header from './Header';

const Home = () => {
	return (
		<div className='home'>
			<Header />
			<Router>
				<Switch>
					<Route exact path='/' component={LoginForm} />
					<Route path='/home/login' component={LoginForm} />
					<Route path='/home/signup' component={SignupForm} />
					<Route path='/home/range' component={Range} />
				</Switch>
			</Router>
		</div>
	);
};

export default Home;

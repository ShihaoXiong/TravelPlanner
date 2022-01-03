import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Main from './Main';
import '../style/App.css';

function App() {
	// set the title on the tab
	document.title = 'TravelPlanner';
	const [isLoginIn, setIsLoginIn] = useState(sessionStorage.getItem('login') ? true : false);

	return (
		<div className='app'>
			<Router>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/home' render={() => <Home setIsLoginIn={setIsLoginIn} isLoginIn={isLoginIn} />} />
					<Route path='/main' render={() => (isLoginIn ? <Main setIsLoginIn={setIsLoginIn} /> : <Redirect to='/' />)} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;

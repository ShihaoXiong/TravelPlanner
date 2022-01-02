import '../style/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Main from './Main';

function App() {
	// set the title on the tab
	document.title = 'TravelPlanner';

	return (
		<div className='app'>
			<Router>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/home' component={Home} />
					<Route path='/main' component={Main} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;

import '../style/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Main from './Main';

function App() {
	return (
		<div className='app'>
			<Router>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/main' component={Main} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;

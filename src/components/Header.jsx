import React, { Component, createRef } from 'react';
import lottie from 'lottie-web';
import animationData from '../assets/animation.json';
import { withRouter } from 'react-router-dom';
import '../style/Header.css';

class Header extends Component {
	constructor() {
		super();
		this.logoRef = createRef();
	}

	componentDidMount() {
		const { current: container } = this.logoRef;

		lottie.loadAnimation({
			container,
			renderer: 'svg',
			loop: false,
			autoplay: true,
			animationData
		});
	}

	render() {
		const { history } = this.props;

		return (
			<header className='header flex'>
				<div className='logo-container pointer' ref={this.logoRef} onClick={() => history.push('/')}></div>
				<h1 className='header__title pointer' onClick={() => history.push('/')}>
					TravelPlanner
				</h1>
			</header>
		);
	}
}

export default withRouter(Header);

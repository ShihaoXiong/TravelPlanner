import React, { Component, createRef } from 'react';
import lottie from 'lottie-web';
import animationData from '../assets/animation.json';
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

	toHome = () => (window.location.href = '/');

	render() {
		return (
			<header className='header flex'>
				<div className='logo-container pointer' ref={this.logoRef} onClick={this.toHome}></div>
				<h1 className='header__title pointer' onClick={this.toHome}>
					TravelPlanner
				</h1>
			</header>
		);
	}
}

export default Header;

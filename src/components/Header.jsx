import React, { Component, createRef } from 'react';
import lottie from 'lottie-web';
import animationData from '../assets/animation.json';
import '../style/Header.css';

export default class Header extends Component {
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
		return (
			<header className='header flex'>
				<div className='logo-container' ref={this.logoRef}></div>
				<h1 className='header__title'>TravelPlanner</h1>
			</header>
		);
	}
}

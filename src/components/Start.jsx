import React, { useRef, useEffect, useState } from 'react';
import '../style/Start.css';

const Start = ({ children, initOffset, upadteOffset }) => {
	const childrenRef = useRef(null);
	const [offset, setOffset] = useState(initOffset);
	const [className, setClassName] = useState('');

	useEffect(() => {
		window.location.pathname === '/' ? setClassName('init') : setClassName('');

		if (window.location.pathname !== '/') {
			const { current } = childrenRef;
			const newVal = current.offsetHeight / 2 + 20;
			setOffset(newVal);
			upadteOffset(newVal);
		}
	}, [childrenRef, upadteOffset]);

	return (
		<div className={`start flex ${className}`}>
			<h1 className={`start__text up ${className}`} style={{ top: `${-offset}px` }}>
				TravelPlanner
			</h1>
			<h1 className={`start__text down ${className}`} style={{ top: `${offset}px` }}>
				TravelPlanner
			</h1>
			<span ref={childrenRef} className={`start__children ${className}`}>
				{children}
			</span>
		</div>
	);
};

export default Start;

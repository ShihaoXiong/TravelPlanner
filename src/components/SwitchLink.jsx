import React from 'react';
import { withRouter } from 'react-router-dom';
import '../style/SwitchLink.css';

const SwitchLink = ({ children, history, href }) => {
	return (
		<div className='switch-link pointer' onClick={() => history.push(href)}>
			{children}
		</div>
	);
};

export default withRouter(SwitchLink);

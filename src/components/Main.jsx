import React, { useState } from 'react';
import Map from './Map';
import '../style/Main.css';
import { Timeline, Modal, Button } from 'antd';
import Attractions from './Attractions';

const Main = () => {
	const [visible, setVisible] = useState(false);
	return (
		<main className='main'>
			<Map />
			<aside className='aside blur'>
				<Button className='button' type='primary' onClick={() => setVisible(true)}>
					Edit Trip
				</Button>
				<div className='timeline'>
					<Timeline>
						<Timeline.Item>Starting Date 2021-12-21</Timeline.Item>
					</Timeline>
				</div>
			</aside>

			<Modal
				title='Plan Your Trip Here'
				centered
				visible={visible}
				onOk={() => setVisible(false)}
				onCancel={() => setVisible(false)}
				width={1000}
			>
				<Attractions />
			</Modal>
		</main>
	);
};

export default Main;

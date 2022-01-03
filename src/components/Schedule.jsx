import React, { useState } from 'react';
import Attractions from './Attractions';
import { Timeline, Modal, Button, Empty } from 'antd';
import dayjs from 'dayjs';
import '../style/Schedule.css';

const ScheduleCard = ({ scheduleData }) => {
	return (
		<div className='schedule-card'>
			{scheduleData.length ? (
				<Timeline>
					{scheduleData.map(item => (
						<Timeline.Item key={item.name}>{item.name}</Timeline.Item>
					))}
				</Timeline>
			) : (
				<Empty />
			)}
		</div>
	);
};

class Plan {
	constructor(id) {
		this.id = id;
		this.visit = [
			{ date: dayjs().format('MM/DD/YYYY'), attractions: [] },
			{ date: dayjs().add(1, 'day').format('MM/DD/YYYY'), attractions: [] },
			{ date: dayjs().add(2, 'day').format('MM/DD/YYYY'), attractions: [] }
		];
	}
}

const Schedule = () => {
	const [visible, setVisible] = useState(false);
	const [plan, setPlan] = useState(new Plan());

	const handelComfirm = () => {
		console.log(plan);
		setVisible(false);
	};

	const handleCancel = () => {
		setPlan(new Plan());
		setVisible(false);
	};

	return (
		<>
			<Button className='button' type='primary' onClick={() => setVisible(true)}>
				Edit Trip
			</Button>

			{plan.visit.map((item, index) => (
				<ScheduleCard key={index} scheduleData={item.attractions} />
			))}

			<Modal
				title='Plan Your Trip Here'
				centered
				visible={visible}
				onOk={handelComfirm}
				onCancel={handleCancel}
				width={1000}
			>
				<Attractions plan={plan} />
			</Modal>
		</>
	);
};

export default Schedule;

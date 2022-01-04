import React, { useState, useEffect } from 'react';
import Attractions from './Attractions';
import { Timeline, Modal, Button, Empty, notification, Spin } from 'antd';
import { useSelector } from 'react-redux';
import '../style/Schedule.css';
import http from '../service';

const ScheduleCard = ({ scheduleData, date, onClick, className }) => {
	return (
		<div className={`schedule-card pointer ${className}`} onClick={onClick}>
			<h3 className='schedule-card__date'>{date}</h3>
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

export class Plan {
	constructor({ visitPlanId, visitItemList }, date) {
		this.id = visitPlanId;

		if (!visitItemList || !visitItemList.length) {
			this.visit = date?.map(item => ({ date: item, attractions: [] })) ?? [];
			return;
		}

		const map = new Map();
		visitItemList.forEach(item => {
			const { date, attraction } = item;
			const preAttractuions = map.get(date) ?? [];
			map.set(date, attraction ? [...preAttractuions, attraction] : preAttractuions);
		});

		this.visit = [];
		map.forEach((value, key) => {
			this.visit.push({ date: key, attractions: value });
		});
	}

	getAttractions() {
		return this.visit.reduce((pre, cur) => [...pre, ...cur.attractions], []);
	}

	decodePlan() {
		const resPlan = { visitPlanId: this.id, visitItemList: [] };
		this.visit.forEach(item => {
			const { date, attractions } = item;
			const { visitItemList } = resPlan;
			attractions.length
				? attractions.forEach(arr => visitItemList.push({ date, attraction: { attractionID: arr.attractionID } }))
				: visitItemList.push({ date, attraction: {} });
		});

		return resPlan;
	}

	getDate() {
		return this.visit.map(item => item.date);
	}
}

const Schedule = ({ attractions, planData, getVisitPlan, setPlanData, setMarkerData, resetMarker }) => {
	const [visible, setVisible] = useState(false);
	const date = useSelector(state => state.date);
	const [plan, setPlan] = useState(new Plan({ visitPlanId: null }, date));
	const [copyPlan, setCopyPlan] = useState(null);
	const [loading, setLoading] = useState(false);
	const [selectedCard, setSelectedCard] = useState(null);

	const handleOpenModal = () => {
		setVisible(true);
		setCopyPlan(JSON.parse(JSON.stringify(plan)));
	};

	const handelConfirm = () => {
		setLoading(true);
		http
			.post('/saveVisitPlan', plan.decodePlan())
			.then(() => {
				notification.success({ message: 'Saved Succeffully!' });
				// await getVisitPlan();
			})
			.then(() => {
				const requests = date.map(item => http.get(`/shuffleVisitPlan/${plan.id}/${item}`));
				Promise.all(requests)
					.then(res => {
						const planData = res.reduce((pre, cur, index) => {
							cur.length
								? pre.push(...cur)
								: pre.push({
										date: date[index],
										attraction: null
								  });
							return pre;
						}, []);
						setPlanData({ visitPlanId: plan.id, visitItemList: planData });
					})
					.catch(() => getVisitPlan());
			})
			.finally(() => {
				setLoading(false);
				setVisible(false);
			});
	};

	const handleCancel = () => {
		setPlan(copyPlan);
		setVisible(false);
	};

	useEffect(() => {
		if (planData) {
			const formatPlan = new Plan(planData, date);
			setPlan(formatPlan);
			const selectedAttractions = formatPlan.getAttractions();
			// delete these attractions from all attractions list
			selectedAttractions.forEach(item => {
				const index = attractions.findIndex(att => +att?.attractionID === +item?.attractionID);
				attractions.splice(index, 1);
			});
		}
		// eslint-disable-next-line
	}, [planData]);

	const handleCardClick = index => {
		const select = index !== selectedCard;
		select ? setMarkerData(plan.visit[index].attractions) : resetMarker();
		setSelectedCard(select ? index : null);
	};

	return (
		<>
			<Button className='button' type='primary' onClick={handleOpenModal}>
				Edit Trip
			</Button>

			{plan.visit.map((item, index) => (
				<ScheduleCard
					className={selectedCard === index ? 'is-selected' : ''}
					key={index}
					date={item.date}
					scheduleData={item.attractions}
					onClick={() => handleCardClick(index)}
				/>
			))}

			<Modal
				title='Plan Your Trip Here'
				centered
				visible={visible}
				onOk={handelConfirm}
				onCancel={handleCancel}
				width={1000}
			>
				<Spin spinning={loading}>
					<Attractions plan={plan} attractions={attractions} />
				</Spin>
			</Modal>
		</>
	);
};

export default Schedule;

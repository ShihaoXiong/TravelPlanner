import React, { useEffect } from 'react';
import { Select, Tabs, DatePicker, Button, notification } from 'antd';
import { BankTwoTone, CalendarTwoTone, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DATE_FORMAT } from '../service/constant';
import dayjs from 'dayjs';
import http from '../service';
import '../style/Range.css';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Selection = withRouter(({ history }) => {
	const [cities, setCities] = useState([]);
	const dispatch = useDispatch();
	const city = useSelector(state => state.city);
	const date = useSelector(state => state.date);

	const getCityData = () => {
		http.get('/cities').then(res => {
			const data = res.map(item => {
				const [id, name, state, lat, lng] = item;
				return { id, name, state, lat, lng };
			});
			setCities(data);
		});
	};

	useEffect(() => getCityData(), []);

	const handleSelectCity = value => {
		const [lng, lat, id] = value.value;
		dispatch({ type: 'city', value: { lng: +lng, lat: +lat, id, name: value.label } });
	};

	const handleSelectDate = ([startDate, endDate]) => {
		startDate = dayjs(startDate);
		endDate = dayjs(endDate);
		const diff = endDate.diff(startDate, 'day');
		const date = [];
		for (let i = 0; i < diff + 1; i++) {
			date.push(startDate.add(i, 'day').format(DATE_FORMAT));
		}

		dispatch({ type: 'date', value: date });
	};

	const handleConfirm = () => {
		if (!city || !date.length) {
			notification.error({ message: 'Error', description: 'Please select city and date!' });
			return;
		}

		// create visit plan
		http.get('/createVisitPlan').then(res => {
			dispatch({ type: 'planId', value: res.visitPlanId });
			history.push('/main');
		});
	};

	return (
		<div className='selection-container flex'>
			<div className='selection-item'>
				<div className='selection-item__title flex'>
					<BankTwoTone style={{ fontSize: '20px' }} />
					<h2>Location</h2>
				</div>
				<Select
					size='large'
					labelInValue
					className='selection-item__select'
					style={{ width: '100%', backgroundColor: 'transparent' }}
					placeholder='Where do you want to go?'
					onChange={handleSelectCity}
				>
					{cities.map(item => (
						<Option key={item.id} value={[item.lng, item.lat, item.id]}>
							{item.name}
						</Option>
					))}
				</Select>
			</div>

			<div className='selection-item'>
				<div className='selection-item__title flex'>
					<CalendarTwoTone style={{ fontSize: '20px' }} />
					<h2>Date</h2>
				</div>
				<RangePicker style={{ width: '100%' }} size='large' format={DATE_FORMAT} onChange={handleSelectDate} />
			</div>

			<Button
				style={{ marginLeft: 'auto' }}
				type='primary'
				size='large'
				shape='circle'
				icon={<SearchOutlined />}
				onClick={handleConfirm}
			/>
		</div>
	);
});

const Range = () => {
	return (
		<div className='range-container blur flex'>
			<Tabs className='tabs' defaultActiveKey='1'>
				<TabPane tab='New Plan' key='1'>
					<Selection />
				</TabPane>
				<TabPane tab='Saved Plan' key='2'></TabPane>
			</Tabs>
		</div>
	);
};

export default Range;

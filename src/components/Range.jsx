import React, { useEffect } from 'react';
import { Select, Tabs, DatePicker, Button } from 'antd';
import '../style/Range.css';
import { BankTwoTone, CalendarTwoTone, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import http from '../service';
import { withRouter } from 'react-router-dom';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Selection = withRouter(({ history }) => {
	const [cities, setCities] = useState([]);
	const dispatch = useDispatch();

	const getCityData = () => {
		http.get('/cities').then(res => {
			const data = res.map(item => {
				const [id, name, state, lat, lon] = item;
				return { id, name, state, lat, lon };
			});
			setCities(data);
		});
	};

	useEffect(() => getCityData(), []);

	const handleSelectCity = value => {
		dispatch({ type: 'setCity', value: { id: value.key, name: value.label } });
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
						<Option key={item.id}>{item.name}</Option>
					))}
				</Select>
			</div>

			<div className='selection-item'>
				<div className='selection-item__title flex'>
					<CalendarTwoTone style={{ fontSize: '20px' }} />
					<h2>Date</h2>
				</div>
				<RangePicker style={{ width: '100%' }} size='large' format='MM/DD/YYYY' />
			</div>

			<Button
				style={{ marginLeft: 'auto' }}
				type='primary'
				size='large'
				shape='circle'
				icon={<SearchOutlined />}
				onClick={() => history.push('/main')}
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

import React from 'react';
import { Select, Tabs, DatePicker, Button } from 'antd';
import '../style/Range.css';
import { BankTwoTone, CalendarTwoTone, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Selection = () => {
	const [citys, setCitys] = useState([]);

	return (
		<div className='selection-container flex'>
			<div className='selection-item'>
				<div className='selection-item__title flex'>
					<BankTwoTone style={{ fontSize: '20px' }} />
					<h2>Location</h2>
				</div>
				<Select
					size='large'
					className='selection-item__select'
					style={{ width: '100%', backgroundColor: 'transparent' }}
					placeholder='Where do you want to go?'
				>
					{citys.map(item => (
						<Option>{item}</Option>
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

			<Button style={{ marginLeft: 'auto' }} type='primary' size='large' shape='circle' icon={<SearchOutlined />} />
		</div>
	);
};

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

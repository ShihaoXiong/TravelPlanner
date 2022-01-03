import React, { useState, useEffect } from 'react';
import Map from './Map';
import '../style/Main.css';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Schedule from './Schedule';
import http from '../service';

const Main = ({ history, setIsLoginIn }) => {
	const city = useSelector(state => state.city);
	const planId = useSelector(state => state.planId);
	const [attractions, setAttractions] = useState([]);
	const [copyAttractions, setCopyAttractions] = useState([]);
	const [markerData, setMarkerData] = useState([]);
	const [planData, setPlanData] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await http.get(`/city/${city.id}`).then(res => {
				setAttractions(res);
				setCopyAttractions(JSON.parse(JSON.stringify(res)));
				setMarkerData(res);
				dispatch({ type: 'attractions', value: res });
			});

			await getVisitPlan();
		})();
		// eslint-disable-next-line
	}, []);

	const getVisitPlan = async () => {
		await http.get(`/visitPlan/${planId}`).then(res => {
			setPlanData(res);
		});
	};

	const resetMarker = () => {
		setMarkerData(copyAttractions);
	};

	const handleLogout = () => {
		sessionStorage.clear();
		setIsLoginIn(false);
		history.push('/');
	};

	return (
		<main className='main'>
			<Map attractions={markerData} />
			<aside className='aside blur'>
				{city && <h1 className='city'>{city.name}</h1>}
				<Schedule
					attractions={attractions}
					planData={planData}
					getVisitPlan={getVisitPlan}
					setPlanData={setPlanData}
					setMarkerData={setMarkerData}
					resetMarker={resetMarker}
				/>
			</aside>

			<Button
				className='btn-home'
				type='primary'
				shape='circle'
				size='large'
				icon={<HomeOutlined />}
				onClick={handleLogout}
			/>
		</main>
	);
};

export default withRouter(Main);

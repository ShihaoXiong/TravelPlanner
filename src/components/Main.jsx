import React, { useState, useEffect } from 'react';
import Map from './Map';
import { Button, Spin } from 'antd';
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Schedule, { Plan } from './Schedule';
import http from '../service';
import '../style/Main.css';

const Main = ({ history, setIsLoginIn }) => {
	const city = useSelector(state => state.city);
	const planId = useSelector(state => state.planId);
	const date = useSelector(state => state.date);
	const [attractions, setAttractions] = useState([]);
	const [copyAttractions, setCopyAttractions] = useState([]);
	const [markerData, setMarkerData] = useState([]);
	const [planData, setPlanData] = useState(null);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			setLoading(true);
			await http.get(`/city/${city.id}`).then(res => {
				setAttractions(res);
				setCopyAttractions(JSON.parse(JSON.stringify(res)));
				setMarkerData(res);
				dispatch({ type: 'attractions', value: res });
			});

			await http.post('/saveVisitPlan', new Plan({ visitPlanId: planId }, date).decodePlan());
			await getVisitPlan();
			setLoading(false);
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

	const handleToHome = () => {
		history.push('/home/range');
	};

	return (
		<main className='main'>
			<Map attractions={markerData} />
			<aside className='aside blur'>
				{city && <h1 className='city'>{city.name}</h1>}
				<Spin spinning={loading}>
					<Schedule
						attractions={attractions}
						planData={planData}
						getVisitPlan={getVisitPlan}
						setPlanData={setPlanData}
						setMarkerData={setMarkerData}
						resetMarker={resetMarker}
					/>
				</Spin>
			</aside>

			<Button
				className='btn-home'
				type='primary'
				shape='circle'
				size='large'
				icon={<HomeOutlined />}
				onClick={handleToHome}
			/>

			<Button
				danger
				className='btn-logout'
				type='primary'
				shape='circle'
				size='large'
				icon={<LogoutOutlined />}
				onClick={handleLogout}
			/>
		</main>
	);
};

export default withRouter(Main);

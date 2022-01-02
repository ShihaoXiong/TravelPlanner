import React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { API_KEY } from '../service/constant';
import MapBase from './MapBase';
import MapMarker from './MapMarker';
import attractions from '../assets/attractions.json';
import { Spin } from 'antd';

const Loading = () => {
	return <Spin size='large' />;
};

const Map = () => {
	const { results } = attractions;

	return (
		<Wrapper apiKey={API_KEY} render={Loading}>
			<MapBase>
				{/* <MapMarker position={{ lat: 40.7127281, lng: -74.0060152 }} /> */}
				{results.map(item => {
					const {
						geometry: { location },
						icon: url,
						name
					} = item;
					const icon = { url, scaledSize: { width: 30, height: 30 } };
					return <MapMarker key={name} icon={icon} position={location} />;
				})}
			</MapBase>
		</Wrapper>
	);
};

export default Map;

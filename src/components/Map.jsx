import React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { API_KEY } from '../service/constant';
import MapBase from './MapBase';
import MapMarker from './MapMarker';

function Map() {
	return (
		<Wrapper apiKey={API_KEY}>
			<MapBase>
				<MapMarker position={{ lat: 40.7127281, lng: -74.0060152 }} />
			</MapBase>
		</Wrapper>
	);
}

export default Map;

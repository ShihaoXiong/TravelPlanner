import React, { Children, isValidElement, cloneElement, useState, useEffect, useRef } from 'react';
import '../style/Map.css';

const defaultOptions = {
	mapTypeControl: false,
	streetViewControl: false,
	zoomControl: false,
	fullscreenControl: false
};

function MapBase({ children }) {
	const [map, setMap] = useState();
	const mapRef = useRef();

	useEffect(() => {
		if (mapRef.current && !map) {
			setMap(
				new window.google.maps.Map(mapRef.current, {
					center: { lat: 40.7127281, lng: -74.0060152 },
					zoom: 10,
					...defaultOptions
				})
			);
		}
	}, [mapRef, map]);

	return (
		<>
			<div className='map-container' ref={mapRef} />
			{Children.map(children, child => {
				if (isValidElement(child)) {
					return cloneElement(child, { map });
				}
			})}
		</>
	);
}

export default MapBase;

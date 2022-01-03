import React, { Children, isValidElement, cloneElement, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../style/Map.css';

const defaultOptions = {
	mapTypeControl: false,
	streetViewControl: false,
	zoomControl: false,
	fullscreenControl: false
};

function MapBase({ children, center }) {
	const [map, setMap] = useState();
	const mapRef = useRef();

	useEffect(() => {
		if (mapRef.current && !map) {
			setMap(
				new window.google.maps.Map(mapRef.current, {
					center,
					zoom: 13,
					...defaultOptions
				})
			);
		}
	}, [mapRef, map, center]);

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

MapBase.propTypes = {
	center: PropTypes.object
};

export default MapBase;

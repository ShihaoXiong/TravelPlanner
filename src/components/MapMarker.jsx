import { useEffect, useState } from 'react';

const MapMarker = options => {
	const [marker, setMarker] = useState();

	useEffect(() => {
		!marker && setMarker(new window.google.maps.Marker());
		return () => marker && marker.setMap(null);
	}, [marker]);

	useEffect(() => {
		marker && marker.setOptions(options);
	}, [marker, options]);

	return null;
};

export default MapMarker;

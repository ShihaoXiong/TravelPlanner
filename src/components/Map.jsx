import React, { Component, createRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { API_KEY } from '../service/constant';
import '../style/Map.css';

const loader = new Loader({
	apiKey: API_KEY,
	version: 'weekly'
});

export default class Map extends Component {
	constructor() {
		super();
		this.mapRef = createRef();
		this.map = null;
	}

	componentDidMount() {
		loader.load().then(google => {
			this.map = new google.maps.Map(this.mapRef.current, {
				center: { lat: 40.7127281, lng: -74.0060152 },
				zoom: 10,
				mapTypeControl: false,
				streetViewControl: false,
				zoomControl: false,
				fullscreenControl: false
			});
		});
	}

	render() {
		return <div className='map-container' ref={this.mapRef}></div>;
	}
}

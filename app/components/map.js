import React from 'react';
import { findDOMNode } from 'react-dom';

import L from 'leaflet';

import '../../node_modules/leaflet/dist/leaflet.css';
import './map.scss';

const Map = React.createClass({

  getInitialState: function() {
    return {
      geocodingText: '',
      geocodingSelected: null,
      geocodingResults: null
    };
  },

  getDefaultProps: function() {
    return {
      options: {},
      crosshair: true,
      geocoder: false
    };
  },

  render: function() {

    var crosshair;
    if (this.props.crosshair) {
      crosshair = (
        <div className='map-crosshair-container'>
          <div className='map-crosshair' />
        </div>
      );
    }

    var className = 'map-container';
    if (this.getOptions('grayscale')) {
      className += ' grayscale';
    }

    var resultList;
    if (this.state.geocodingResults && !this.state.geocodingSelected) {
      resultList = (
        <ol>
          {this.state.geocodingResults.features.map((feature) => (
            <li key={feature.properties.id} onClick={this.geocodeResultClick.bind(this, feature)}>
              {feature.properties.label}
            </li>
          ))}
        </ol>
      )
    }

    var geocoder;
    if (this.props.geocoder) {
      geocoder = <input type='text' ref='search' placeholder='Search for places…'
        onKeyUp={this.geocode} />
    }

    return (
      <div className={className}>
        <div className='map-search'>
          {geocoder}
          {resultList}
        </div>
        <div className='map' ref='map' />
        {crosshair}
      </div>
    );
  },

  geocodeResultClick: function(feature) {
    this.setState({
      geocodingSelected: feature
    })

    var node = findDOMNode(this.refs.search);
    node.value = feature.properties.label

    if (feature.geometry.type === 'Point') {
      this.state.map.panTo([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]);
    }
  },

  geocode: function(e) {
    if (e.keyCode == 13) {
      var token = 'search-nW0Pk78';
      var node = findDOMNode(this.refs.search);
      var query = encodeURIComponent(node.value);
      var center = this.state.map.getCenter()
      var url = `https://search.mapzen.com/v1/search?text=${query}&api_key=${token}` +
        `&focus.point.lat=${center.lat}&focus.point.lon=${center.lng}`;
      //  `&boundary.country=USA`

      fetch(url)
        .then(response => {
          return response.json();
        }).then(json => {
          this.setState({
            geocodingText: query,
            geocodingSelected: null,
            geocodingResults: json
          });
        }).catch(err => {
          this.setState({
            geocodingText: null,
            geocodingSelected: null,
            geocodingResults: null
          });
          console.error(err);
        });
    }
  },

  getOptions: function(key) {
    return this.props.options[key] || this.props.defaults.map[key];
  },

  componentDidMount: function() {
    var node = findDOMNode(this.refs.map);

    var map = L.map(node, {
      center: this.getOptions('center'),
      zoom: this.getOptions('zoom'),
      maxZoom: this.getOptions('maxZoom'),
      scrollWheelZoom: 'center',
      doubleClickZoom: 'center'
    });

    var layer = L.tileLayer(this.getOptions('tileUrl'), {
      subdomains: this.getOptions('subdomains').toString(),
      attribution: this.getOptions('attribution')
    }).addTo(map);

    if (this.props.mapEvents) {
      Object.keys(this.props.mapEvents).forEach(event => map.on(event, this.props.mapEvents[event]));
    }

    if (this.props.mapCreated) {
      this.props.mapCreated(map);
    }

    this.setState({
      map: map
    });
  },

  roundCoordinates: function(coordinate) {
    return Math.round(coordinate * 1000000) / 1000000;
  },

  getMap: function() {
    return this.state.map;
  },

  setView: function(center, zoom) {
    if (this.state.map) {
      this.state.map.setView(center, zoom);
    }
  },

  getView: function() {
    if (this.state.map) {
      var center = this.state.map.getCenter();
      return {
        center: [
          center.lng,
          center.lat
        ].map(this.roundCoordinates),
        zoom: this.state.map.getZoom(),
      };
    } else {
      return null;
    }
  }

});

export default Map;
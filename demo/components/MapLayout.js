import React, { Component } from 'react'
import L from 'leaflet'

import { Map, FullscreenControl, TileLayer, Marker, Popup, GoogleLayer, LayersControl, WMSTileLayer, ZoomControl, ScaleControl } from '../../src'

const {BaseLayer, Overlay} = LayersControl

export default class MapLayout extends Component {
    state = {
        lat: 10.804476,
        lng: 106.639384,
        zoom: 10,
    }

    componentDidMount(){
        const {leafletElement: map} = this.refs.map;
    }

    render () {
        let geom = { "type": "FeatureCollection", "features": [{ "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [[[106.57424926757812, 10.714586690981509], [106.57424926757812, 10.852188818037952], [106.76101684570312, 10.852188818037952], [106.76101684570312, 10.714586690981509], [106.57424926757812, 10.714586690981509]]]}}]};

        const mapOptions = {
            center: [this.state.lat, this.state.lng],
            zoom: this.state.zoom,
            zoomControl: false,
        }

        return (
            <Map ref="map" {...mapOptions}>
                <ZoomControl />
                <ScaleControl />
                <FullscreenControl />

                <LayersControl>
                    <BaseLayer name='GIS nền' checked>
                        <WMSTileLayer url='http://pcd.hcmgis.vn/geoserver2/ows?' layers='hcm_map:hcm_map'/>
                    </BaseLayer>
                    <BaseLayer name='Google'>
                        <GoogleLayer type="roadmap" />
                    </BaseLayer>
                    <BaseLayer name='Mapbox'>
                        <TileLayer
                            url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
                            id="mapbox.streets"
                            accessToken="pk.eyJ1IjoidHR1bmdibXQiLCJhIjoiY2EzNDFhZjU4ZThkNzY5NTU3M2U1YWFiNmY4OTE3OWQifQ.Bo1ss5J4UjPPOjmq9S3VQw"
                            attribution='Map data &copy; <a href="http://mapbox.com">Mapbox</a>'/>
                    </BaseLayer>
                    <BaseLayer name='Ảnh hàng không'>
                        <TileLayer url='http://hcmgisportal.vn/basemap/cache_lidar/{z}/{x}/{y}.jpg'/>
                    </BaseLayer>
                    <BaseLayer name='Ảnh vệ tinh'>
                        <GoogleLayer
                            type="satellite" />
                    </BaseLayer>
                </LayersControl>
            </Map>
        )
    }
}

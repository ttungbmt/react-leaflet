/* @flow */
import React, {PropTypes}  from 'react';
import GridLayer from './GridLayer';
import L from 'leaflet'

require('leaflet.gridlayer.googlemutant')

export default class GoogleLayer extends GridLayer {
    static propTypes = {
        type: PropTypes.string,
        styles: PropTypes.array,
        tile: PropTypes.bool,
    };

    static defaultProps = {
        type: 'roadmap', //'roadmap', 'satellite', 'terrain', 'hybrid'
    };

    componentWillMount() {

        super.componentWillMount();
        const {tile, ...props} = this.props;

        let type = this.convertType(this.props.type)

        this.leafletElement = tile ?
            L.tileLayer(`http://{s}.google.com/vt/lyrs=`+type+`&x={x}&y={y}&z={z}`, {
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                attribution: '&copy; Google Maps',
                ...this.getOptions(this.props)
            }) :
            L.gridLayer.googleMutant(this.getOptions(this.props))


    }

    convertType(mapType: string){
        /*
         h = roads only
         m = standard roadmap
         p = terrain
         r = somehow altered roadmap
         s = satellite only
         t = terrain only
         y = hybrid
         */

        switch(mapType) {
            case 'roadmap': return 'm';
            case 'satellite': return 's';
            case 'terrain': return 't';
            case 'hybrid': return 'y';
            default: return mapType;
        }
    }
}
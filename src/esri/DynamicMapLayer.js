/* @flow */
import { PropTypes } from 'react'
import esri from 'esri-leaflet';
import MapLayer from '../MapLayer'

export default class DynamicMapLayer extends MapLayer {

    /* https://esri.github.io/esri-leaflet/api-reference/layers/dynamic-map-layer.html */
    static propTypes = {
        url: PropTypes.string.isRequired,
        format: PropTypes.string,
        transparent: PropTypes.bool,
        f: PropTypes.string,
        attribution: PropTypes.string,
        layers: PropTypes.array,
        layerDefs: PropTypes.object,
        opacity: PropTypes.number,
        position: PropTypes.string,
        dynamicLayers: PropTypes.object,
        token: PropTypes.string,
        proxy: PropTypes.string,
        useCors: PropTypes.bool,
    };

    componentWillMount () {
        super.componentWillMount()
        const { url, ...props } = this.props
        this.leafletElement = esri.dynamicMapLayer({ url, ...this.getOptions(props)})
    }
}
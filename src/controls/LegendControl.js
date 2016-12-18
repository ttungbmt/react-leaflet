/* @flow */

import {PropTypes} from 'react';
import L from 'leaflet'
import MapControl from '../'

export default class LegendControl extends MapControl {
    static propTypes = {
        position: PropTypes.string,
        html: PropTypes.string,
    };

    static defaultProps = {
        html: ''
    };

    componentWillMount() {
        this.leafletElement = L.control.legend(this.props);
    }
}

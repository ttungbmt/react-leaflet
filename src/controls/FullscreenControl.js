/* @flow */
import { PropTypes } from 'react'
import MapControl from '../MapControl'

require('leaflet.fullscreen/Control.FullScreen.css');
const Fullscreen = require('exports?L.control.fullscreen!leaflet.fullscreen');
// npm install exports-loader


export default class FullscreenControl extends MapControl {
    static propTypes = {
        position: PropTypes.string,
        title: PropTypes.string,
        titleCancel: PropTypes.string,
        content: PropTypes.node,
        forceSeparateButton: PropTypes.bool,
        forcePseudoFullscreen: PropTypes.bool,
        fullscreenElement: PropTypes.bool
    };

    static defaultProps = {
        position: 'bottomright',
        title: 'Toàn màn hình',
        titleCancel: 'Thu nhỏ',
        content: null,
        forceSeparateButton: false,
        forcePseudoFullscreen: false,
    }

    componentWillMount () {
        this.leafletElement = Fullscreen(this.props)
    }
}

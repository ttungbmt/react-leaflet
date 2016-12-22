/* @flow */

import { tileLayer } from 'leaflet'
import { PropTypes } from 'react'
import {isEmpty} from 'lodash'

import childrenType from './types/children'
import GridLayer from './GridLayer'

export default class TileLayer extends GridLayer {
  static propTypes = {
    children: childrenType,
    opacity: PropTypes.number,
    url: PropTypes.string.isRequired,
    zIndex: PropTypes.number,
    boundary: PropTypes.object
  };

  componentWillMount () {
    super.componentWillMount()
    const { url, boundary, ...props } = this.props

    let layer = tileLayer(url, this.getOptions(props))
    // this.leafletElement = isEmpty(boundary) ? layer : this.withBoundary(layer)
    this.leafletElement = tileLayer(url, this.getOptions(props))
  }

  withBoundary(tileLayer) {
    return L.TileLayer.BoundaryCanvas.createFromLayer(
        tileLayer,
        {boundary: this.props.boundary, trackAttribution: true}
    )
  }

  componentDidUpdate (prevProps: Object) {
    super.componentDidUpdate(prevProps)
    const { url } = this.props
    if (url !== prevProps.url) {
      this.leafletElement.setUrl(url)
    }
  }
}

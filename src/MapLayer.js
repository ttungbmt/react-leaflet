/* @flow */

import React from 'react'
import {isEmpty} from 'lodash'

import childrenType from './types/children'
import layerContainerType from './types/layerContainer'
import mapType from './types/map'

import MapComponent from './MapComponent'

import L from 'leaflet'
import 'leaflet-boundary-canvas'

export default class MapLayer extends MapComponent {
  static propTypes = {
    children: childrenType,
  };

  static contextTypes = {
    layerContainer: layerContainerType,
    map: mapType,
    pane: React.PropTypes.string,
  };

  get layerContainer (): Object {
    return this.context.layerContainer || this.context.map
  }

  componentDidMount () {
    super.componentDidMount()



    this.checkBoundTileLayer();

    this.layerContainer.addLayer(this.leafletElement)


  }

  checkBoundTileLayer(){
    const {boundary} = this.props
    if(!isEmpty(boundary) && this.leafletElement instanceof L.TileLayer){
      this.leafletElement = L.TileLayer.BoundaryCanvas.createFromLayer(
          this.leafletElement,
          {boundary, trackAttribution: true}
      )
    }
  }

  componentWillUnmount () {
    super.componentWillUnmount()
    this.layerContainer.removeLayer(this.leafletElement)
  }

  render (): React.Element<*> | null {
    return Array.isArray(this.props.children)
      ? <div style={{display: 'none'}}>{this.props.children}</div>
      : (this.props.children || null)
  }
}

import {
  default as React,
  PropTypes,
  Component,
} from "react";

import {
  default as GoogleMapHolder,
  mapDefaultPropTypes,
  mapControlledPropTypes,
  mapEventPropTypes,
} from "./creators/GoogleMapHolder";

export default class GoogleMap extends Component {
  static propTypes = {
    map: PropTypes.object,
    // Uncontrolled default[props] - used only in componentDidMount
    ...mapDefaultPropTypes,
    // Controlled [props] - used in componentDidMount/componentDidUpdate
    ...mapControlledPropTypes,
    // Event [onEventName]
    ...mapEventPropTypes,
  };

  // Public APIs
  //
  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map
  //
  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return it.match(/^get/) && !it.match(/Map$/); })
  getBounds() { return (this.props.map || this.refs.delegate).getBounds(); }

  getCenter() { return (this.props.map || this.refs.delegate).getCenter(); }

  getDiv() { return (this.props.map || this.refs.delegate).getDiv(); }

  getHeading() { return (this.props.map || this.refs.delegate).getHeading(); }

  getMapTypeId() { return (this.props.map || this.refs.delegate).getMapTypeId(); }

  getProjection() { return (this.props.map || this.refs.delegate).getProjection(); }

  getStreetView() { return (this.props.map || this.refs.delegate).getStreetView(); }

  getTilt() { return (this.props.map || this.refs.delegate).getTilt(); }

  getZoom() { return (this.props.map || this.refs.delegate).getZoom(); }
  // END - Public APIs
  //
  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map
  //
  // Public APIs - Use this carefully
  // See discussion in https://github.com/tomchentw/react-google-maps/issues/62
  //
  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map
  //
  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; }).filter(function(it){ return !it.match(/^get/) && !it.match(/^set/) && !it.match(/Map$/); })
  fitBounds(bounds) { return (this.props.map || this.refs.delegate).fitBounds(bounds); }

  panBy(x, y) { return (this.props.map || this.refs.delegate).panBy(x, y); }

  panTo(latLng) { return (this.props.map || this.refs.delegate).panTo(latLng); }

  panToBounds(latLngBounds) { return (this.props.map || this.refs.delegate).panToBounds(latLngBounds); }
  // END - Public APIs - Use this carefully
  //
  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map

  render() {
    const { children, ...mapProps } = this.props;

    return (
      <GoogleMapHolder {...mapProps}>
        {children}
      </GoogleMapHolder>
    );
  }
}

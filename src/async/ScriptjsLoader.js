import {
  default as React,
  Component,
  PropTypes,
} from "react";

import {
  default as propTypesElementOfType,
} from "react-prop-types-element-of-type";

import {
  default as canUseDOM,
} from "can-use-dom";

import {
  default as warning,
} from "warning";

import {
  GoogleMap,
  GoogleMapLoader,
} from "../index";

import {
  default as makeUrl,
  urlObjDefinition,
  getUrlObjChangedKeys,
} from "../utils/makeUrl";

export default class ScriptjsLoader extends Component {
  static propTypes = {
    ...urlObjDefinition,
    // PropTypes for ScriptjsLoader
    loadingElement: PropTypes.node,
    // ...GoogleMapLoader.propTypes,// Uncomment for 5.0.0
    googleMapElement: propTypesElementOfType(GoogleMap).isRequired,
  };

  static defaultProps = {
  };

  state = {
    isLoaded: false,
  }

  componentWillMount() {
    if (!canUseDOM) {
      return;
    }

    // External commonjs require dependency
    // eslint-disable-next-line global-require
    const scriptjs = require(`scriptjs`);

    const { protocol, hostname, port, pathname, query } = this.props;
    const url = makeUrl({ protocol, hostname, port, pathname, query });
    scriptjs(url, () => this.setState({ isLoaded: true }));
  }

  componentWillReceiveProps(nextProps) {
    if (`production` !== process.env.NODE_ENV) {
      const changedKeys = getUrlObjChangedKeys(this.props, nextProps);

      warning(changedKeys.length === 0, `ScriptjsLoader doesn't support mutating url related props after initial render. Changed props: %s`, `[${changedKeys.join(`, `)}]`);
    }
  }

  render() {
    // Strip private properties
    // eslint-disable-next-line no-unused-vars
    const { protocol, hostname, port, pathname, query, loadingElement, ...restProps } = this.props;

    if (this.state.isLoaded) {
      return <GoogleMapLoader {...restProps} />;
    } else {
      return loadingElement;
    }
  }
}

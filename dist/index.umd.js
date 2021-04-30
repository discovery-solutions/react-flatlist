(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@babel/runtime/helpers/slicedToArray'), require('@babel/runtime/helpers/objectWithoutProperties'), require('@babel/runtime/helpers/typeof'), require('react'), require('react-dom')) :
	typeof define === 'function' && define.amd ? define(['@babel/runtime/helpers/slicedToArray', '@babel/runtime/helpers/objectWithoutProperties', '@babel/runtime/helpers/typeof', 'react', 'react-dom'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['@octaldev/react-flatlist'] = factory(global._slicedToArray, global._objectWithoutProperties, global._typeof, global.React, global.ReactDOM));
}(this, (function (_slicedToArray, _objectWithoutProperties, _typeof, React, ReactDOM) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
	var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
	var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);
	var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
	var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

	var renderComponent = function renderComponent(Component, style) {
	  if (["object", "function"].includes(_typeof__default['default'](Component)) === false) return null;

	  if (_typeof__default['default'](Component) === "object") {
	    var Clone = /*#__PURE__*/React__default['default'].cloneElement(Component, {
	      style: style
	    });
	    return Clone;
	  }

	  return /*#__PURE__*/React__default['default'].createElement(Component, {
	    style: style
	  });
	};

	var FlatList = function FlatList(_ref, ref) {
	  var _ref$onEndReached = _ref.onEndReached,
	      onEndReached = _ref$onEndReached === void 0 ? function () {
	    return null;
	  } : _ref$onEndReached,
	      _ref$renderItem = _ref.renderItem,
	      renderItem = _ref$renderItem === void 0 ? function () {
	    return null;
	  } : _ref$renderItem,
	      _ref$initialNumToRend = _ref.initialNumToRender,
	      initialNumToRender = _ref$initialNumToRend === void 0 ? 30 : _ref$initialNumToRend,
	      data = _ref.data,
	      rest = _objectWithoutProperties__default['default'](_ref, ["onEndReached", "renderItem", "initialNumToRender", "data"]);

	  var _useState = React.useState(initialNumToRender),
	      _useState2 = _slicedToArray__default['default'](_useState, 2),
	      limit = _useState2[0],
	      setLimit = _useState2[1];

	  var container = React.useRef({});
	  var slicedData = data.slice(0, limit);

	  var scrollTo = function scrollTo(index) {
	    try {
	      container.current.childNodes[index].scrollIntoView({
	        behavior: "smooth",
	        block: "start"
	      });
	    } catch (e) {
	      console.log(e);
	    }
	  };

	  var scrollToIndex = React.useCallback(function (index) {
	    if (index > limit) setLimit(index + initialNumToRender);
	    return scrollTo(index);
	  }, [scrollTo, limit, setLimit]);
	  React__default['default'].useImperativeHandle(ref, function () {
	    return {
	      scrollToIndex: scrollToIndex,
	      scrollToEnd: function scrollToEnd(forceEnd) {
	        if (forceEnd) return scrollToIndex(data.length - 1);
	        return scrollToIndex(limit - 1);
	      }
	    };
	  });

	  var getParentNode = function getParentNode() {
	    try {
	      return ReactDOM__default['default'].findDOMNode(container.current).parentNode;
	    } catch (e) {
	      return undefined;
	    }
	  };

	  var onScroll = function onScroll() {
	    var _getParentNode = getParentNode(),
	        scrollTop = _getParentNode.scrollTop,
	        scrollHeight = _getParentNode.scrollHeight,
	        offsetHeight = _getParentNode.offsetHeight;

	    var contentHeight = scrollHeight - offsetHeight;

	    if (contentHeight <= scrollTop) {
	      onEndReached();
	      setLimit(limit + initialNumToRender);
	    }
	  };

	  React.useEffect(function () {
	    var parent = getParentNode();
	    parent.addEventListener("scroll", onScroll);
	    return function () {
	      return parent.removeEventListener("scroll", onScroll);
	    };
	  }, [onScroll]);
	  if (Array.isArray(data) === false) return null;
	  return /*#__PURE__*/React__default['default'].createElement("div", {
	    ref: container
	  }, renderComponent(rest.ListHeaderComponent, rest.ListHeaderComponentStyle), slicedData.map(function (item, index) {
	    return renderItem({
	      item: item,
	      index: index
	    });
	  }), renderComponent(rest.ListFooterComponent, rest.ListFooterComponentStyle));
	};

	var index = /*#__PURE__*/React__default['default'].forwardRef(FlatList);

	return index;

})));

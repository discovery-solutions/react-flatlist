'use strict';

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var _typeof = require('@babel/runtime/helpers/typeof');
var React = require('react');
var Utils = require('@octaldev/utils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Utils__default = /*#__PURE__*/_interopDefaultLegacy(Utils);

var renderComponent = function renderComponent(Component) {
  var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var returnComponent = arguments.length > 2 ? arguments[2] : undefined;
  if (["object", "function"].includes(_typeof__default['default'](Component)) === false) return null;

  if (_typeof__default['default'](Component) === "object") {
    var Clone = /*#__PURE__*/React__default['default'].cloneElement(Component, {
      style: style
    });
    return Clone;
  }

  if (returnComponent) return Component;
  return /*#__PURE__*/React__default['default'].createElement(Component, {
    style: style
  });
};

var FlatList = function FlatList(_ref, ref) {
  var _ref$onEndReached = _ref.onEndReached,
      onEndReached = _ref$onEndReached === void 0 ? function () {
    return null;
  } : _ref$onEndReached,
      _ref$onTopReached = _ref.onTopReached,
      onTopReached = _ref$onTopReached === void 0 ? function () {
    return null;
  } : _ref$onTopReached,
      _ref$renderItem = _ref.renderItem,
      renderItem = _ref$renderItem === void 0 ? function () {
    return null;
  } : _ref$renderItem,
      _ref$initialNumToRend = _ref.initialNumToRender,
      initialNumToRender = _ref$initialNumToRend === void 0 ? 30 : _ref$initialNumToRend,
      data = _ref.data,
      rest = _objectWithoutProperties__default['default'](_ref, ["onEndReached", "onTopReached", "renderItem", "initialNumToRender", "data"]);

  if (Array.isArray(data) !== true) data = [];

  var _useState = React.useState(initialNumToRender),
      _useState2 = _slicedToArray__default['default'](_useState, 2),
      limit = _useState2[0],
      setLimit = _useState2[1];

  var _useState3 = React.useState(data.slice(0, limit)),
      _useState4 = _slicedToArray__default['default'](_useState3, 2),
      slicedData = _useState4[0],
      setSlicedData = _useState4[1];

  var footerID = React.useRef("flatlist-footer-".concat(Date.now())).current;
  var listeners = React.useRef(global.octal_dev_flatlist_on_scroll_listeners).current;

  var Container = rest.Component || function (props) {
    return /*#__PURE__*/React__default['default'].createElement("div", props);
  };

  var getContainer = function getContainer() {
    try {
      return document.getElementById(footerID).parentNode;
    } catch (e) {
      // console.log(e);
      return {};
    }
  };

  var getParentNode = function getParentNode() {
    return getContainer().parentNode;
  };

  var scrollTo = function scrollTo(index) {
    try {
      getContainer().childNodes[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
      });
    } catch (e) {// console.log(e);
    }
  };

  var scrollToIndex = React__default['default'].useCallback(function (index) {
    if (index > limit) setLimit(index + initialNumToRender);
    return scrollTo(index);
  }, [scrollTo, limit, setLimit]);

  var onScroll = function onScroll() {
    var useCallbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    if (!getParentNode()) return null;

    var _getParentNode = getParentNode(),
        scrollTop = _getParentNode.scrollTop,
        scrollHeight = _getParentNode.scrollHeight,
        offsetHeight = _getParentNode.offsetHeight;

    var contentHeight = scrollHeight - offsetHeight;
    if (scrollTop === 0 && useCallbacks) onTopReached();

    if (contentHeight <= scrollTop) {
      if (useCallbacks) onEndReached();
      if (limit < data.length) setLimit(limit + initialNumToRender);
    }
  };

  var keyExtractor = function keyExtractor(item, index) {
    if (rest !== null && rest !== void 0 && rest.keyExtractor && typeof rest.keyExtractor === "function") return rest.keyExtractor(item, index);
    return index;
  };

  var handleScrolls = function handleScrolls(useCallbacks) {
    try {
      listeners[footerID](useCallbacks);
    } catch (e) {// console.log(e);
    }
  };

  React.useEffect(function () {
    if (Utils__default['default'].compareObjects(data, slicedData) === false) setSlicedData(data.slice(0, limit));
  }, [data, slicedData, setSlicedData, limit]);
  React.useEffect(function () {
    if (getParentNode() && (limit !== initialNumToRender || slicedData.length === 0)) setSlicedData(data.slice(0, limit));
  }, [limit, data]);
  React__default['default'].useImperativeHandle(ref, function () {
    return {
      scrollToIndex: scrollToIndex,
      scrollToEnd: function scrollToEnd(forceEnd) {
        if (forceEnd) return scrollToIndex(data.length - 1);
        return scrollToIndex(limit - 1);
      }
    };
  });
  React.useEffect(function () {
    handleScrolls(false);
  }, [handleScrolls]);
  React.useEffect(function () {
    var updatedListeners = global.octal_dev_flatlist_on_scroll_listeners;

    if (_typeof__default['default'](updatedListeners) !== "object") {
      updatedListeners = _defineProperty__default['default']({}, footerID, onScroll);
    } else {
      updatedListeners[footerID] = onScroll;
    }

    listeners = updatedListeners;
  }, [onScroll]);
  React.useEffect(function () {
    var parent = getParentNode();

    var listener = function listener() {
      return handleScrolls(true);
    };

    if (parent) {
      parent.addEventListener("scroll", listener);
      return function () {
        return parent.removeEventListener("scroll", listener);
      };
    }
  }, [onScroll, getContainer, handleScrolls]);

  var Item = function Item(_ref2) {
    var data = _ref2.data;
    return renderItem(data);
  };

  return /*#__PURE__*/React__default['default'].createElement(Container, rest, renderComponent(rest.ListHeaderComponent, rest.ListHeaderComponentStyle), data.length > 0 ? slicedData.map(function (item, index) {
    return /*#__PURE__*/React__default['default'].createElement(Item, {
      key: keyExtractor(item, index),
      data: {
        item: item,
        index: index
      }
    });
  }) : renderComponent(rest.ListEmptyComponent), renderComponent(rest.ListFooterComponent, rest.ListFooterComponentStyle), /*#__PURE__*/React__default['default'].createElement("div", {
    id: footerID
  }));
};

var index = /*#__PURE__*/React__default['default'].forwardRef(FlatList);

module.exports = index;

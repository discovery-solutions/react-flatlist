import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _typeof from '@babel/runtime/helpers/typeof';
import React, { useState, useRef, useEffect } from 'react';

var renderComponent = function renderComponent(Component) {
  var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var returnComponent = arguments.length > 2 ? arguments[2] : undefined;
  if (["object", "function"].includes(_typeof(Component)) === false) return null;

  if (_typeof(Component) === "object") {
    var Clone = /*#__PURE__*/React.cloneElement(Component, {
      style: style
    });
    return Clone;
  }

  if (returnComponent) return Component;
  return /*#__PURE__*/React.createElement(Component, {
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
      rest = _objectWithoutProperties(_ref, ["onEndReached", "onTopReached", "renderItem", "initialNumToRender", "data"]);

  var _useState = useState(initialNumToRender),
      _useState2 = _slicedToArray(_useState, 2),
      limit = _useState2[0],
      setLimit = _useState2[1];

  var _useState3 = useState(data.slice(0, limit)),
      _useState4 = _slicedToArray(_useState3, 2),
      slicedData = _useState4[0],
      setSlicedData = _useState4[1];

  var footerID = useRef("flatlist-footer-".concat(Date.now())).current;
  var listeners = useRef(global.octal_dev_flatlist_on_scroll_listeners).current;

  var Container = rest.Component || function (props) {
    return /*#__PURE__*/React.createElement("div", props);
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

  var scrollToIndex = React.useCallback(function (index) {
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

  useEffect(function () {
    if (getParentNode() && (limit !== initialNumToRender || slicedData.length === 0)) setSlicedData(data.slice(0, limit));
  }, [limit, data]);
  React.useImperativeHandle(ref, function () {
    return {
      scrollToIndex: scrollToIndex,
      scrollToEnd: function scrollToEnd(forceEnd) {
        if (forceEnd) return scrollToIndex(data.length - 1);
        return scrollToIndex(limit - 1);
      }
    };
  });
  useEffect(function () {
    handleScrolls(false);
  }, [handleScrolls]);
  useEffect(function () {
    var updatedListeners = global.octal_dev_flatlist_on_scroll_listeners;

    if (_typeof(updatedListeners) !== "object") {
      updatedListeners = _defineProperty({}, footerID, onScroll);
    } else {
      updatedListeners[footerID] = onScroll;
    }

    listeners = updatedListeners;
  }, [onScroll]);
  useEffect(function () {
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
  if (Array.isArray(data) === false || data.length === 0) return null;

  var Item = function Item(_ref2) {
    var data = _ref2.data;
    return renderItem(data);
  };

  return /*#__PURE__*/React.createElement(Container, rest, renderComponent(rest.ListHeaderComponent, rest.ListHeaderComponentStyle), slicedData.map(function (item, index) {
    return /*#__PURE__*/React.createElement(Item, {
      key: keyExtractor(item, index),
      data: {
        item: item,
        index: index
      }
    });
  }), renderComponent(rest.ListFooterComponent, rest.ListFooterComponentStyle), /*#__PURE__*/React.createElement("div", {
    id: footerID
  }));
};

var index = /*#__PURE__*/React.forwardRef(FlatList);

export default index;

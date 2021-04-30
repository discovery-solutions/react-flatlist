import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _typeof from '@babel/runtime/helpers/typeof';
import React, { forwardRef, useState, useEffect } from 'react';

var footerID = "flatlist-footer-".concat(Date.now());

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
      _ref$renderItem = _ref.renderItem,
      renderItem = _ref$renderItem === void 0 ? function () {
    return null;
  } : _ref$renderItem,
      _ref$initialNumToRend = _ref.initialNumToRender,
      initialNumToRender = _ref$initialNumToRend === void 0 ? 30 : _ref$initialNumToRend,
      data = _ref.data,
      rest = _objectWithoutProperties(_ref, ["onEndReached", "renderItem", "initialNumToRender", "data"]);

  var _useState = useState(initialNumToRender),
      _useState2 = _slicedToArray(_useState, 2),
      limit = _useState2[0],
      setLimit = _useState2[1];

  var slicedData = data.slice(0, limit);
  var Container = rest.Component ? /*#__PURE__*/forwardRef(rest.Component) : function (props) {
    return /*#__PURE__*/React.createElement("div", props);
  };

  var getContainer = function getContainer() {
    try {
      return document.getElementById(footerID).parentNode;
    } catch (e) {
      console.log(e);
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
  React.useImperativeHandle(ref, function () {
    return {
      scrollToIndex: scrollToIndex,
      scrollToEnd: function scrollToEnd(forceEnd) {
        if (forceEnd) return scrollToIndex(data.length - 1);
        return scrollToIndex(limit - 1);
      }
    };
  });

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

  useEffect(function () {
    onScroll();
  }, []);
  useEffect(function () {
    var parent = getParentNode();

    if (parent) {
      parent.addEventListener("scroll", onScroll);
      return function () {
        return parent.removeEventListener("scroll", onScroll);
      };
    }
  }, [onScroll, getContainer]);
  if (Array.isArray(data) === false) return null;
  return /*#__PURE__*/React.createElement(Container, rest, renderComponent(rest.ListHeaderComponent, rest.ListHeaderComponentStyle), slicedData.map(function (item, index) {
    return renderItem({
      item: item,
      index: index
    });
  }), renderComponent(rest.ListFooterComponent, rest.ListFooterComponentStyle), /*#__PURE__*/React.createElement("div", {
    id: footerID
  }));
};

var index = /*#__PURE__*/forwardRef(FlatList);

export default index;

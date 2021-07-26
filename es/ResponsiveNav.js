import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["activeKey", "children", "removable", "onItemRemove", "moreText", "moreProps"],
    _excluded2 = ["children", "eventKey"];
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import bindElementResize, { unbind } from 'element-resize-event';
import { Nav, Dropdown, DOMHelper as _ } from 'rsuite';
import RemoveButton from './RemoveButton';
import useCustomCompareEffect from './useCustomCompareEffect';
var ResponsiveNav = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var activeKey = props.activeKey,
      children = props.children,
      removable = props.removable,
      onItemRemove = props.onItemRemove,
      moreText = props.moreText,
      moreProps = props.moreProps,
      rest = _objectWithoutPropertiesLoose(props, _excluded);

  var _useState = useState(0),
      width = _useState[0],
      setWidth = _useState[1];

  var _useState2 = useState(0),
      contentWidth = _useState2[0],
      setContentWidth = _useState2[1];

  var _useState3 = useState(0),
      moreWidth = _useState3[0],
      setMoreWidth = _useState3[1];

  var _useState4 = useState([]),
      itemWidthList = _useState4[0],
      setItemWidthList = _useState4[1];

  var containerRef = useRef();
  var moreItemRef = useRef();
  var placeholderStyles = {
    height: 0,
    overflow: 'hidden'
  };

  var handleResize = function handleResize() {
    var items = containerRef.current.querySelectorAll('.rs-nav-item');

    var containerWidth = _.getWidth(containerRef.current);

    var list = [];
    var countWidth = 0;
    Array.from(items).forEach(function (element) {
      var w = _.getWidth(element);

      countWidth += w;
      list.push(w);
    });
    setWidth(containerWidth);
    setContentWidth(countWidth);
    setItemWidthList(list);
  };

  useEffect(function () {
    if (containerRef.current) {
      handleResize();
      bindElementResize(containerRef.current, handleResize);
    }

    return function () {
      unbind(containerRef.current);
    };
  }, []);
  useEffect(function () {
    if (moreItemRef.current && moreWidth === 0) {
      setMoreWidth(_.getWidth(moreItemRef.current));
    }
  }, [moreWidth]);
  console.log(moreWidth, moreItemRef.current);
  useCustomCompareEffect(handleResize, [children], function (prevDeps, nextDeps) {
    var prevChildren = prevDeps[0];
    var nextChildren = nextDeps[0];
    return prevChildren.flat().length === nextChildren.flat().length;
  });

  var renderChildren = function renderChildren() {
    var items = [];

    if (contentWidth <= width) {
      items = children;
    } else {
      var rangeWidth = 0;
      var dropdownItems = [];
      React.Children.forEach(children, function (child, index) {
        var itemWidth = itemWidthList[index];
        rangeWidth += itemWidth;

        if (rangeWidth < width) {
          items.push(child);
        } else {
          dropdownItems.push(child);
        }
      });

      if (dropdownItems.length) {
        dropdownItems.splice(0, 0, items.pop());
        var k = 0;

        for (var i = 0; i < items.length; i++) {
          k += itemWidthList[i];
        }

        if (moreWidth + k > width) {
          dropdownItems.splice(0, 0, items.pop());
        }

        if (items[items.length - 1]) {
          dropdownItems.splice(0, 0, items[items.length - 1]);
        }

        var activeItem = dropdownItems.find(function (item) {
          return item && item.props.eventKey === activeKey;
        });

        if (activeItem) {
          items.splice(items.length - 1, 1, activeItem);
        }

        items.push( /*#__PURE__*/React.createElement(Dropdown, _extends({
          ref: moreItemRef
        }, moreProps, {
          title: moreText,
          key: "more"
        }), dropdownItems.map(function (child, index) {
          if (!child) {
            return null;
          }

          var _child$props = child.props,
              itemChildren = _child$props.children,
              eventKey = _child$props.eventKey,
              itemRest = _objectWithoutPropertiesLoose(_child$props, _excluded2);

          return /*#__PURE__*/React.createElement(Dropdown.Item, _extends({
            key: eventKey || index,
            eventKey: eventKey
          }, itemRest), itemChildren);
        })));
      }
    }

    if (removable) {
      return items.map(function (item, key) {
        if (~item.type.displayName.indexOf('Nav.Item')) {
          return /*#__PURE__*/React.cloneElement(item, {
            key: key,
            children: /*#__PURE__*/React.createElement(RemoveButton, {
              eventKey: item.props.eventKey,
              activeKey: activeKey,
              onItemRemove: onItemRemove
            }, item.props.children)
          });
        }

        return item;
      });
    }

    return items;
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    style: placeholderStyles
  }, /*#__PURE__*/React.createElement(Nav, rest, removable ? children.map(function (item, key) {
    return /*#__PURE__*/React.cloneElement(item, {
      key: key,
      children: /*#__PURE__*/React.createElement(RemoveButton, {
        eventKey: item.props.eventKey,
        activeKey: activeKey,
        onItemRemove: onItemRemove
      }, item.props.children)
    });
  }) : children)), /*#__PURE__*/React.createElement(Nav, _extends({
    ref: ref,
    activeKey: activeKey
  }, rest), renderChildren()));
});
ResponsiveNav.defaultProps = {
  moreText: 'More'
};
ResponsiveNav.propTypes = {
  removable: PropTypes.bool,
  onItemRemove: PropTypes.func,
  activeKey: PropTypes.string,
  children: PropTypes.any,
  moreText: PropTypes.node,
  moreProps: PropTypes.object
};
ResponsiveNav.displayName = 'ResponsiveNav';
ResponsiveNav.Item = Nav.Item;
export default ResponsiveNav;
import React from 'react';
import CloseIcon from '@rsuite/icons/Close';

var RemoveButton = function RemoveButton(props) {
  var eventKey = props.eventKey,
      activeKey = props.activeKey,
      onItemRemove = props.onItemRemove,
      children = props.children;

  var handleRemove = function handleRemove(event) {
    event.stopPropagation();
    event.preventDefault();
    onItemRemove === null || onItemRemove === void 0 ? void 0 : onItemRemove(eventKey);
  };

  var iconStyle = {
    fontSize: 12,
    marginLeft: 4,
    width: 12
  };

  if (activeKey === eventKey) {
    iconStyle.color = '#f44336';
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, children, " ", /*#__PURE__*/React.createElement(CloseIcon, {
    onClick: handleRemove,
    style: iconStyle
  }));
};

export default RemoveButton;
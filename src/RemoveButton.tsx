import React from 'react';
import CloseIcon from '@rsuite/icons/Close';

export interface RemoveButtonProps<T> {
  eventKey: T;
  activeKey: T;
  children: React.ReactNode;
  onItemRemove?: (eventKey: T) => void;
}

const RemoveButton = (props: RemoveButtonProps<number | string>) => {
  const { eventKey, activeKey, onItemRemove, children } = props;
  const handleRemove = (event: React.MouseEvent<HTMLOrSVGElement>) => {
    event.stopPropagation();
    event.preventDefault();
    onItemRemove?.(eventKey);
  };

  const iconStyle: React.CSSProperties = {
    fontSize: 12,
    marginLeft: 4,
    width: 12
  };

  if (activeKey === eventKey) {
    iconStyle.color = '#f44336';
  }

  return (
    <>
      {children} <CloseIcon onClick={handleRemove} style={iconStyle} />
    </>
  );
};

export default RemoveButton;

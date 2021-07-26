import React from 'react';
export interface RemoveButtonProps<T> {
    eventKey: T;
    activeKey: T;
    children: React.ReactNode;
    onItemRemove?: (eventKey: T) => void;
}
declare const RemoveButton: (props: RemoveButtonProps<number | string>) => JSX.Element;
export default RemoveButton;

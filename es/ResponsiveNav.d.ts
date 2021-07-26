import React from 'react';
import { Nav } from 'rsuite';
import { NavProps } from 'rsuite/es/Nav/Nav';
import { DropdownProps } from 'rsuite/es/Dropdown';
export interface ResponsiveNavProps<T> extends NavProps<T> {
    /**
     * More drop-down menu props
     */
    moreProps?: DropdownProps;
    /**
     * More text displayed on the drop-down
     */
    moreText?: React.ReactNode;
    /**
     * The callback function when removing options
     */
    onItemRemove?: (eventKey: T) => void;
    /**
     * Options can be removed
     */
    removable?: boolean;
    children?: React.ReactNodeArray;
}
interface RefForwardingComponent<P = unknown> {
    (props: P, context?: any): React.ReactElement | null;
    propTypes?: any;
    contextTypes?: any;
    defaultProps?: Partial<P>;
    displayName?: string;
}
export interface ResponsiveNavComponent extends RefForwardingComponent<ResponsiveNavProps<number | string>> {
    Item: typeof Nav.Item;
}
declare const ResponsiveNav: ResponsiveNavComponent;
export default ResponsiveNav;

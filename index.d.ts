import * as React from 'react';
import Nav, { NavProps } from 'rsuite/es/Nav/Nav';
import { DropdownMenuProps } from 'rsuite/es/Dropdown/DropdownMenu';

export interface Props<T> extends NavProps<T> {
  /**
   * More drop-down menu props
   */
  moreProps?: DropdownMenuProps;

  /**
   * More text displayed on the drop-down
   */
  moreText?: React.ReactNode;

  /**
   * The callback function when removing options
   */
  onItemRemove?(eventKey: T): void;

  /**
   * Options can be removed
   */
  removable?: boolean;
}

export class ResponsiveNav<T> extends React.Component<Props<T>> {
  static Item: typeof Nav.Item;
}

export default ResponsiveNav;

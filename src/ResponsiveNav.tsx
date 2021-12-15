import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ResizeObserver } from '@juggle/resize-observer';
import { Nav, Dropdown, DOMHelper as _ } from 'rsuite';

import { NavProps } from 'rsuite/Nav';
import { DropdownProps } from 'rsuite/Dropdown';
import RemoveButton from './RemoveButton';
import useCustomCompareEffect from './useCustomCompareEffect';

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

export interface ResponsiveNavComponent
  extends RefForwardingComponent<ResponsiveNavProps<number | string>> {
  Item: typeof Nav.Item;
}

const ResponsiveNav: ResponsiveNavComponent = React.forwardRef(
  (props: ResponsiveNavProps<number | string>, ref) => {
    const { activeKey, children, removable, onItemRemove, moreText, moreProps, ...rest } = props;
    const [width, setWidth] = useState(0);
    const [contentWidth, setContentWidth] = useState(0);
    const [moreWidth, setMoreWidth] = useState(0);
    const [itemWidthList, setItemWidthList] = useState([]);

    const containerRef = useRef<HTMLDivElement>();
    const moreItemRef = useRef();
    const resizeObserver = useRef<ResizeObserver>();

    const placeholderStyles = {
      height: 0,
      overflow: 'hidden'
    };

    const handleResize = () => {
      const items = containerRef.current.querySelectorAll('.rs-nav-item');
      const containerWidth = _.getWidth(containerRef.current);
      const list = [];
      let countWidth = 0;

      Array.from(items).forEach(element => {
        const w = _.getWidth(element);
        countWidth += w;
        list.push(w);
      });

      setWidth(containerWidth);
      setContentWidth(countWidth);
      setItemWidthList(list);
    };

    useEffect(() => {
      if (containerRef.current) {
        handleResize();

        resizeObserver.current = new ResizeObserver(handleResize);
        resizeObserver.current.observe(containerRef.current);
      }
      return () => {
        resizeObserver.current?.disconnect();
      };
    }, []);

    useEffect(() => {
      if (moreItemRef.current && moreWidth === 0) {
        setMoreWidth(_.getWidth(moreItemRef.current));
      }
    }, [moreWidth]);

    useCustomCompareEffect(handleResize, [children], (prevDeps, nextDeps) => {
      const prevChildren = prevDeps[0];
      const nextChildren = nextDeps[0];

      return prevChildren.flat().length === nextChildren.flat().length;
    });

    const renderChildren = () => {
      let items = [];
      if (contentWidth <= width) {
        items = children;
      } else {
        let rangeWidth = 0;
        const dropdownItems = [];

        React.Children.forEach(children, (child, index) => {
          const itemWidth = itemWidthList[index];
          rangeWidth += itemWidth;
          if (rangeWidth < width) {
            items.push(child);
          } else {
            dropdownItems.push(child);
          }
        });

        if (dropdownItems.length) {
          dropdownItems.splice(0, 0, items.pop());

          let k = 0;
          for (let i = 0; i < items.length; i++) {
            k += itemWidthList[i];
          }

          if (moreWidth + k > width) {
            dropdownItems.splice(0, 0, items.pop());
          }

          if (items[items.length - 1]) {
            dropdownItems.splice(0, 0, items[items.length - 1]);
          }

          const activeItem = dropdownItems.find(item => item && item.props.eventKey === activeKey);

          if (activeItem) {
            items.splice(items.length - 1, 1, activeItem);
          }

          items.push(
            <Dropdown
              key="more"
              ref={moreItemRef}
              {...moreProps}
              title={moreText}
              appearance="subtle"
            >
              {dropdownItems.map((child, index) => {
                if (!child) {
                  return null;
                }
                const {
                  children: itemChildren,
                  eventKey,
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  classPrefix,
                  ...itemRestProps
                } = child.props;
                return (
                  <Dropdown.Item key={eventKey || index} eventKey={eventKey} {...itemRestProps}>
                    {itemChildren}
                  </Dropdown.Item>
                );
              })}
            </Dropdown>
          );
        }
      }

      if (removable) {
        return items.map((item, key) => {
          if (~item.type.displayName.indexOf('Nav.Item')) {
            return React.cloneElement(item, {
              key,
              children: (
                <RemoveButton
                  eventKey={item.props.eventKey}
                  activeKey={activeKey}
                  onItemRemove={onItemRemove}
                >
                  {item.props.children}
                </RemoveButton>
              )
            });
          }
          return item;
        });
      }

      return items;
    };

    return (
      <>
        <div ref={containerRef} style={placeholderStyles}>
          <Nav {...rest}>
            {removable
              ? children.map((item: any, key) =>
                  React.cloneElement(item, {
                    key,
                    children: (
                      <RemoveButton
                        eventKey={item.props.eventKey}
                        activeKey={activeKey}
                        onItemRemove={onItemRemove}
                      >
                        {item.props.children}
                      </RemoveButton>
                    )
                  })
                )
              : children}
          </Nav>
        </div>
        <Nav ref={ref} activeKey={activeKey} {...rest}>
          {renderChildren()}
        </Nav>
      </>
    );
  }
) as unknown as ResponsiveNavComponent;

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

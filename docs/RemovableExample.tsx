import React from 'react';
import { Button } from 'rsuite';
import MoreIcon from '@rsuite/icons/More';
import TabNav from '../src';

function getKey() {
  return (Math.random() * 1e18).toString(36).slice(0, 5).toUpperCase() + '';
}

class RemovableExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 'A',
      items: [
        { eventKey: 'A', label: 'Item A' },
        { eventKey: 'B', label: 'Item B' },
        { eventKey: 'C', label: 'Item C' },
        { eventKey: 'D', label: 'Item D' },
        { eventKey: 'E', label: 'Item E' },
        { eventKey: 'F', label: 'Item F' }
      ]
    };
  }
  render() {
    return (
      <div className="example">
        <h2>Removable</h2>

        <TabNav
          removable
          appearance="tabs"
          moreText={<MoreIcon />}
          moreProps={{ noCaret: true }}
          activeKey={this.state.activeKey}
          onSelect={eventKey => {
            this.setState({
              activeKey: eventKey
            });
          }}
          onItemRemove={eventKey => {
            const { items } = this.state;
            items.splice(items.map(item => item.eventKey).indexOf(eventKey), 1);
            this.setState({
              items,
              activeKey: items[0] ? items[0].eventKey : null
            });
          }}
        >
          {this.state.items.map(item => (
            <TabNav.Item key={item.eventKey} eventKey={item.eventKey}>
              {item.label}
            </TabNav.Item>
          ))}
        </TabNav>
        <hr />
        <Button
          appearance="primary"
          onClick={() => {
            const { items } = this.state;
            const itemKey = getKey();
            items.push({
              eventKey: itemKey,
              label: `Item ${itemKey}`
            });
            this.setState({
              items
            });
          }}
        >
          New Item
        </Button>
      </div>
    );
  }
}

export default RemovableExample;

import React from 'react';
import Nav from '../src';

// appearance="tabs"
class DefaultExample extends React.Component {
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
        { eventKey: 'F', label: 'Item F' },
        { eventKey: 'G', label: 'Item G' },
        { eventKey: 'H', label: 'Item H' },
        { eventKey: 'I', label: 'Item I' },
        { eventKey: 'J', label: 'Item J' },
        { eventKey: 'K', label: 'Item K' },
        { eventKey: 'L', label: 'Item L' },
        { eventKey: 'M', label: 'Item M' },
        { eventKey: 'N', label: 'Item N' },
      ],
    };
  }
  handleSelect = (eventKey) => {
    this.setState({
      activeKey: eventKey,
    });
  };
  render() {
    const { activeKey, items } = this.state;
    const children = items.map((item) => (
      <Nav.Item key={item.eventKey} eventKey={item.eventKey}>
        {item.label}
      </Nav.Item>
    ));
    return (
      <div className="example">
        <h2>Default</h2>
        <Nav activeKey={activeKey} onSelect={this.handleSelect}>
          {children}
        </Nav>
        <hr />
        <Nav
          activeKey={activeKey}
          onSelect={this.handleSelect}
          appearance="tabs"
        >
          {children}
        </Nav>
        <hr />
        <Nav
          activeKey={activeKey}
          onSelect={this.handleSelect}
          appearance="subtle"
        >
          {children}
        </Nav>
      </div>
    );
  }
}

export default DefaultExample;

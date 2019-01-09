import React from "react";
import TabNav from "../src";

class DefaultExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "A"
    };
  }
  render() {
    return (
      <div className="example">
        <h2>Default</h2>
        <TabNav
          activeKey={this.state.activeKey}
          onSelect={eventKey => {
            this.setState({
              activeKey: eventKey
            });
          }}
        >
          <TabNav.Item eventKey="A">Item A</TabNav.Item>
          <TabNav.Item eventKey="B">Item B</TabNav.Item>
          <TabNav.Item eventKey="C">Item C</TabNav.Item>
          <TabNav.Item eventKey="D">Item D</TabNav.Item>
          <TabNav.Item eventKey="E">Item E</TabNav.Item>
          <TabNav.Item eventKey="F">Item F</TabNav.Item>
          <TabNav.Item eventKey="G">Item G</TabNav.Item>
          <TabNav.Item eventKey="H">Item H</TabNav.Item>
          <TabNav.Item eventKey="I">Item I</TabNav.Item>
          <TabNav.Item eventKey="J">Item J</TabNav.Item>
          <TabNav.Item eventKey="K">Item K</TabNav.Item>
          <TabNav.Item eventKey="L">Item L</TabNav.Item>
          <TabNav.Item eventKey="M">Item M</TabNav.Item>
          <TabNav.Item eventKey="N">Item N</TabNav.Item>
          <TabNav.Item eventKey="O">Item O</TabNav.Item>
        </TabNav>
      </div>
    );
  }
}

export default DefaultExample;

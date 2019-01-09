import React from 'react';
import ReactDOM from 'react-dom';

import './styles.less';
import DefaultExample from './DefaultExample';
import RemovableExample from './RemovableExample';

class App extends React.Component {
  render() {
    return (
      <div className="page">
        <h1>Tab Nav</h1>
        <hr />
        <DefaultExample />
        <hr />
        <RemovableExample />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

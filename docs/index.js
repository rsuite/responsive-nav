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
        <p>A tab component based on rsuite nav enhancements </p>
        <p>
          <a href="https://github.com/rsuite/tab-nav">
            https://github.com/rsuite/tab-nav
          </a>
        </p>
        <hr />
        <DefaultExample />
        <hr />
        <RemovableExample />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

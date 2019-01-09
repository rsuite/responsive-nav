import React from 'react';
import ReactDOM from 'react-dom';

import './styles.less';
import DefaultExample from './DefaultExample';
import RemovableExample from './RemovableExample';

class App extends React.Component {
  render() {
    return (
      <div className="page">
        <h1>Responsive Nav</h1>
        <p>
          A responsive navigation component based on rsuite navigation
          enhancements
        </p>
        <p>
          <a href="https://github.com/rsuite/responsive-nav">
            https://github.com/rsuite/responsive-nav
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

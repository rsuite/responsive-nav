# TabNav

A tab component based on rsuite nav enhancements.

## features

- Support for removable tabs.
- Support for automatic folding options when a row can not show all options.

## Installation

```
npm install @rsuite/tab-nav --save
```

## Usage

```js
import TabNav from "@rsuite/tab-nav";
const App = () => {
  return (
    <TabNav>
      <TabNav.Item eventKey="A">Item A</TabNav.Item>
      <TabNav.Item eventKey="B">Item B</TabNav.Item>
      <TabNav.Item eventKey="C">Item C</TabNav.Item>
      <TabNav.Item eventKey="D">Item D</TabNav.Item>
      <TabNav.Item eventKey="E">Item E</TabNav.Item>
    </TabNav>
  );
};

ReactDOM.render(<App />, mountNode);
```

## Props

`TabNav` extends all the props of [`Nav`](https://rsuitejs.com/en/components/nav) and also supports:



| Property     | Type`(Default)`  | Description                                 |
| ------------ | ---------------- | ------------------------------------------- |
| onItemRemove | (eventKey)=>void | The callback function when removing options |
| removable    | boolean          | Options can be removed                      |



## License

MIT licensed

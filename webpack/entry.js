import { h, render, Component } from 'preact';

import Hello from './components/Hello';

class App extends Component {
  render() {
    return (
      <Hello />
    )
  }
}

render(<App />, document.getElementById('root'));

import { h, render, Component } from 'preact';
import { connect } from 'unistore/preact';
import { createSelector } from 'reselect';
import {defaultTo} from 'ramda';

let actions = store => ({
  // Actions can just return a state update:
  increment(state) {
    return { count: state.count+1 }
  },

  // The above example as an Arrow Function:
  increment2: ({ count }) => ({ count: count+1 }),

  //Actions receive current state as first parameter and any other params next
  //check this function as <button onClick={incrementAndLog}>
  incrementAndLog: ({ count }, event) => {
    console.info(event)
    return { count: count+1 }
  },

  // Async actions can be pure async/promise functions:
  async getStuff(state) {
    let res = await fetch('/foo.json')
    return { stuff: await res.json() }
  },

  // ... or just actions that call store.setState() later:
  incrementAsync(state) {
    setTimeout( () => {
      console.log(store);
      store.setState( { hello: { count : defaultTo(0)(state.hello.count) + 4} });
    }, 1000)
  }
})
class Hello extends Component {
  render() {
    console.log(this)
    //state.get('global');
    return (
      <div>
       <p>Count: {this.props.hello.count}</p>
       <button onClick={this.props.incrementAsync}>Increment</button>
      </div>
    )
  }
}
export default connect('hello', actions)(Hello);


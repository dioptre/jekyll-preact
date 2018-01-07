import { h, render, Component } from 'preact';
import { connect } from 'unistore/preact'

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
      store.setState({ count: state.count+1 })
    }, 10000)
  }
})
class Hello extends Component {
  render() {
    console.log(this)
    return (
      <div>Hey, y’all!! This is a react component.</div>
    )
  }
}
export default connect('count', actions)(
  ({ count, incrementAsync }) => (
      <div>
      <p>Count: {count}</p>
      <button onClick={incrementAsync}>Increment</button>
    </div>
  )
) 

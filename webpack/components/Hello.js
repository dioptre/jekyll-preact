import { h, render, Component } from 'preact';
import { connect } from 'unistore/preact';
import defaultTo from '../utils/defaultTo';
import mergeDeepRight from '../utils/mergeDeepRight';

let actions = store => ({
  //Actions can just return a state update:
  increment(state) {
    return { hello: {...state.hello, count: state.hello.count+1, input: "aksk" }}
  },

  // The above example as an Arrow Function:
  increment2: ({ hello }) => ({ hello : { ...hello, count: hello.count+1 }}),

  //Actions receive current state as first parameter and any other params next
  //check this function as <button onClick={incrementAndLog}>
  incrementAndLog: ({ count }, event) => {
    console.info(event)
    return { count: count+1 }
  },

  // Async actions can be pure async/promise functions:
  // async getStuff(state) {
  //   let res = await fetch('/foo.json')
  //   return { stuff: await res.json() }
  // },

  //... or just actions that call store.setState() later:
  incrementAsync(state) {
    setTimeout( () => {
      let hello = mergeDeepRight(state.hello, { count : defaultTo(0)(state.hello.count) + 1});
      store.setState({hello : hello });
    }, 1000)
  },

  onInputChange (state, event) {
    //console.log(this, state, event);
    //this.setState({input: event.target.value})
    let hello = mergeDeepRight(state.hello, { input : event.target.value});
    store.setState({hello : hello });
  },


  //adds a todo item to the list array
  addTodo (state, data)  {
    return { hello : {
      ...state.hello,
      list: [...state.hello.list, state.hello.input]
    }}
  },

})
class Hello extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.addTodo} action="javascript:">
          <input type="text" value={this.props.hello.input} onKeyUp={this.props.onInputChange} />
        </form>
        {this.props.hello.list.map(item => (
          <li>{item}</li>
        ))}
       <p>Count: {this.props.hello.count}</p>
       <button onClick={this.props.incrementAsync}>Increment Async</button>
       <button onClick={this.props.increment2}>Increment2</button>
       <button onClick={this.props.increment}>Increment</button>
      </div>
    )
  }
}
export default connect('hello', actions)(Hello);


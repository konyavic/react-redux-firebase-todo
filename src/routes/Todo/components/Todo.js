import React from 'react'

const TodoView = (props) => <div>
  foo: {props.foo}
</div>

const TodoAuth = (props) => <div>
  <button onClick={props.doAuth}>auth</button>
</div>

export class Todo extends React.Component {
  componentDidMount() {
    this.props.didMount()
  }

  render() {
    let props = this.props
    return <div style={{ margin: '0 auto' }} >
      <h2>Todo</h2>
      {
        props.isAuth ? <TodoView foo={props.foo}/> : <TodoAuth doAuth={props.doAuth}/>
      }
    </div>
  }
}

Todo.propTypes = {
}

export default Todo

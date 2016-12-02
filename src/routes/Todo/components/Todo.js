import React from 'react'
import TodoView from './TodoView'

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
        props.isAuth ? <TodoView data={props.todos} /> : <TodoAuth doAuth={props.doAuth}/>
      }
    </div>
  }
}

Todo.propTypes = {
}

export default Todo

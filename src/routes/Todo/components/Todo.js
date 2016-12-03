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
        props.isAuth ? <TodoView data={props.todos} onChange={props.handleToggleTodo}/> : <TodoAuth doAuth={props.doAuth}/>
      }
      <form>
        <input type="text" value={props.inputTodo} onChange={props.handleInputText} />
        <input type="button" value="追加" onClick={props.addTodo}/>
      </form>
    </div>
  }
}

Todo.propTypes = {
}

export default Todo

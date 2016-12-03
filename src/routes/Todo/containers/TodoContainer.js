import { connect } from 'react-redux'
import {
  didMount,
  doAuth,
  handleToggleTodo,
  handleInputText,
  addTodo,
} from '../modules/todo'

import Todo from '../components/Todo'

const mapDispatchToProps = {
  didMount,
  doAuth,
  handleToggleTodo,
  handleInputText,
  addTodo,
}

const mapStateToProps = (state) => ({
  isAuth: state.todo.isAuth,
  todos: state.todo.todos,
  inputTodo: state.todo.inputTodo,
})

export default connect(mapStateToProps, mapDispatchToProps)(Todo)

import { connect } from 'react-redux'
import {
  didMount,
  doAuth,
} from '../modules/todo'

import Todo from '../components/Todo'

const mapDispatchToProps = {
  didMount,
  doAuth,
}

const mapStateToProps = (state) => ({
  isAuth: state.todo.isAuth,
  todos: state.todo.todos,
})

export default connect(mapStateToProps, mapDispatchToProps)(Todo)

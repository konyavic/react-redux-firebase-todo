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
  foo: state.todo.foo,
})

export default connect(mapStateToProps, mapDispatchToProps)(Todo)

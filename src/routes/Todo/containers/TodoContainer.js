import { connect } from 'react-redux'
import {
  didMount,
} from '../modules/todo'

import Todo from '../components/Todo'

const mapDispatchToProps = {
  didMount,
}

const mapStateToProps = (state) => ({
  foo: state.todo.foo,
})

export default connect(mapStateToProps, mapDispatchToProps)(Todo)

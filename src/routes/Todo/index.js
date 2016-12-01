import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'todo',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Todo = require('./containers/TodoContainer').default
      const reducer = require('./modules/todo').default

      injectReducer(store, { key: 'todo', reducer })

      cb(null, Todo)

    }, 'todo')
  }
})

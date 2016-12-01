import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'sandbox',
  childRoutes : [
    {
      path : 'todoview',
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          const TodoViewContainer = require('./containers/TodoViewContainer')
          const SandboxTodoView = TodoViewContainer.SandboxTodoView
          const reducer = TodoViewContainer.sandboxTodoViewReducer

          injectReducer(store, { key: 'sandboxTodoView', reducer })

          cb(null, SandboxTodoView)

        }, 'todoview')
      }
    },
  ]
})

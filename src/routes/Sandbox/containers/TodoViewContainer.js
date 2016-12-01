import { connect } from 'react-redux'

const ACTION_HANDLERS = {
}

const initialState = {
}

export function sandboxTodoViewReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

import TodoView from '../../Todo/components/TodoView'

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
  data: [
    {
      title: "仕事する",
      isDone: true,
    },
    {
      title: "アドベントカレンダーを書く",
      isDone: false,
    },
    {
      title: "寝る",
      isDone: false,
    },
  ]
})

export let SandboxTodoView = connect(mapStateToProps, mapDispatchToProps)(TodoView)

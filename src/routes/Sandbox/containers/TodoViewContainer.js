import { connect } from 'react-redux'

const ACTION_HANDLERS = {
  ["TODO_TOGGLED"]: (state, action) => {
    let todo = state.data[action.payload]
    let data = [].concat(state.data)
    data[action.payload] = {
      title: todo.title,
      isDone: !todo.isDone,
    }
    return Object.assign({}, state, {data: data})
  },
}

const initialState = {
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
}

export function sandboxTodoViewReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

import TodoView from '../../Todo/components/TodoView'

const mapDispatchToProps = {
  onChange: (i) => {
    return (dispatch, getState) => {
      dispatch({type: "TODO_TOGGLED", payload: i})
    }
  },
}

const mapStateToProps = (state) => ({
  data: state.sandboxTodoView.data
})

export let SandboxTodoView = connect(mapStateToProps, mapDispatchToProps)(TodoView)

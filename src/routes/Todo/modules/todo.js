import firebase from 'firebase'

// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Actions
// ------------------------------------

export function didMount() {
  return (dispatch, getState) => {
    if (getState().todo.isAuth) {
      return
    }
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        return
      }
      dispatch({type: "AUTH_OK"})
      firebase.database().ref("todo").on("child_added", data => {
        let todo = data.val()
        dispatch({
          type: "TASK_ADDED",
          payload: Object.assign({}, todo, {key: data.key})
        })
      })
      firebase.database().ref("todo").on("child_changed", data => {
        let todo = data.val()
        dispatch({
          type: "TASK_CHANGED",
          payload: Object.assign({}, todo, {key: data.key})
        })
      })
    })
  }
}

export function doAuth() {
  return (dispatch, getState) => {
    let provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
  }
}

export function handleToggleTodo(i) {
  return (dispatch, getState) => {
    let todo = getState().todo.todos[i]
    firebase.database().ref("todo/"+todo.key).update({
      title: todo.title,
      is_done: !todo.isDone,
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ["AUTH_OK"]: (state, action) => {
    return Object.assign({}, state, {
      isAuth: true,
      todos: [],
    })
  },
  ["TASK_ADDED"]: (state, action) => {
    return Object.assign({}, state, {
      todos: [].concat(state.todos).concat([{
        key: action.payload.key,
        title: action.payload.title,
        isDone: action.payload.is_done
      }])
    })
  },
  ["TASK_CHANGED"]: (state, action) => {
    let todos = state.todos.map(todo => {
      if (todo.key == action.payload.key) {
        return {
          key: action.payload.key,
          title: action.payload.title,
          isDone: action.payload.is_done
        }
      }
      return todo
    })
    return Object.assign({}, state, {
      todos: todos
    })
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isAuth: false,
  todos: [],
}
export default function todoReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

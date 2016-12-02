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
          payload: todo
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

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ["AUTH_OK"]: (state, action) => {
    return Object.assign({}, state, {isAuth: true})
  },
  ["TASK_ADDED"]: (state, action) => {
    return Object.assign({}, state, {
      todos: [].concat(state.todos).concat([{
        title: action.payload.title,
        isDone: action.payload.is_done
      }])
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

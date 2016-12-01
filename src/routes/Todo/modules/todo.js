import firebase from 'firebase'

// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Actions
// ------------------------------------

export function didMount() {
  return (dispatch, getState) => {
    firebase.database().ref("foo").set("bar").then(() => {
      firebase.database().ref("foo").once('value').then(data => {
        dispatch({
          type: "FOO_SET",
          payload: data.val(),
        })
      })
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ["FOO_SET"]: (state, action) => {
    return Object.assign({}, state, {foo: action.payload})
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  foo: null
}
export default function todoReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

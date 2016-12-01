import firebase from 'firebase'

// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Actions
// ------------------------------------

export function didMount() {
  return (dispatch, getState) => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        return
      }
      dispatch({type: "AUTH_OK"})
      firebase.database().ref("foo").set("bar").then(() => {
        firebase.database().ref("foo").once('value').then(data => {
          dispatch({
            type: "FOO_SET",
            payload: data.val(),
          })
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
  ["FOO_SET"]: (state, action) => {
    return Object.assign({}, state, {foo: action.payload})
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isAuth: false,
  foo: null
}
export default function todoReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

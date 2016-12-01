import React from 'react'

export class Todo extends React.Component {
  componentDidMount() {
    this.props.didMount()
  }

  render() {
    let props = this.props
    return <div style={{ margin: '0 auto' }} >
      <h2>Todo</h2>
      foo: {props.foo}
    </div>
  }
}

Todo.propTypes = {
}

export default Todo

import React from 'react'

const TodoView = (props) => <div>
  <ul style={{textAlign: "left"}}>
    {
      props.data.map((todo, i) => (
        <li key={i} style={{
          textDecoration: todo.isDone ? "line-through" : "none"
        }}>
          <input type="checkbox" checked={todo.isDone} onChange={() => props.onChange(i)}/> 
          {todo.title}
        </li>
      ))
    }
  </ul>
</div>

export default TodoView

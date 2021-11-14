import './App.css';
import React, { useState } from 'react'

import styled from 'styled-components'


const AppContainer = styled.div`
 margin: 10vh 30vw;
`

const TodoItemContainer = styled.div`
  &:hover > p {
    text-decoration: line-through;
  }
`

function TodoItem(props) {
  return (
    <TodoItemContainer onClick={props.deleteCallback}>
      <p>{props.name}</p>
    </TodoItemContainer>
  )
}

const TodoInput = styled.input`
  padding: 0.7em 0.5em;
  border: 1px solid black;
  border-radius: 4px;
`

function TodoForm(props) {
  const [todo, setTodo] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addCallback(todo)
    setTodo("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <TodoInput
        type="text"
        placeholder="Add a new todo..."
        value={todo}
        onChange={e => setTodo(e.target.value)}
      />
    </form>
  )
}

const ButtonInput = styled.button`
  font-size: large;
  ` 

function SkipButtonComponent(props) {
  const handleClick = e => {
    e.preventDefault()
    props.addCallback()

  }
  return (
    <ButtonInput type="button" onClick={handleClick}>
      Skip first todo
    </ButtonInput>
  )
}

function App() {
  const [todos, setTodos] = useState(["do laundry", "finish homework"])

  const deleteTodo = (index) => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  const addTodo = (todo) => {
    const newTodos = [...todos, todo]
    setTodos(newTodos)
  }

  const skipTodo = () => {
    const newTodos = [todos[1], ...todos.slice(2), todos[0]]
    setTodos(newTodos)
  }

  return (
    <AppContainer>
      <h1>todos</h1>
      <p> Click on a todo to delete it.</p>
      <SkipButtonComponent addCallback={skipTodo}/>
      {todos.map((item, i) => <TodoItem
        key={i}
        name={item}
        deleteCallback={() => deleteTodo(i)}
      />)}
      <TodoForm addCallback={addTodo} />
    </AppContainer>
  )
}

export default App;

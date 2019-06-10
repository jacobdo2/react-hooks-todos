import React, { useContext } from 'react'
import TodosContext from '../context'

export default function TodoList() {

    const { state, dispatch } = useContext(TodosContext)
    const title = state.todos.length > 0 
        ? `${state.todos.length} todos` :
        "Nothing to Do!";

    return (
        <div>
            <h1>{title}</h1>
            <ul>
                {state.todos.map(todo => (
                <li key={todo.id}>
                    {todo.complete && (<span>✓</span>)}
                    <span
                        onDoubleClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo })}>{todo.text}</span>
                    <button onClick={() => dispatch({type: 'SET_CURRENT_TODO', payload: todo})}>Edit</button>
                    <button onClick={() => dispatch({ type: "REMOVE_TODO", payload: todo})}>Delete</button>
                </li>))}
            </ul>
        </div>
    )
}
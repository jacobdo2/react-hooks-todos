import uuidv4 from 'uuid/v4'

export default function reducer(state, action) {
    switch (action.type) {
        case 'SET_CURRENT_TODO':
            return {
                ...state,
                currentTodo: action.payload
            }
        case 'TOGGLE_TODO':
            const toggledTodos =  state.todos.map(todo => {
                if(todo.id === action.payload.id) {
                    return {...action.payload, complete: !action.payload.complete}
                }
                return todo
            })
        
            return {
                ...state,
                todos: toggledTodos
            }
        case 'REMOVE_TODO':
            const filteredTodos = state.todos.filter(todo => todo.id !== action.payload.id)
            const isRemovedTodo = state.currentTodo.id === action.payload.id ? {} : state.currentTodo
            return {
                ...state,
                currentTodo: isRemovedTodo,
                todos: filteredTodos
            }
        case 'ADD_TODO':
            //prevent empty todos
            if(!action.payload) {return state}

            //prevent duplicate todos
            if(state.todos.find( todo => todo.text === action.payload)) { return state }

            const newTodo = {
                id: uuidv4(),
                text: action.payload,
                complete: false
            }
            const addedTodos = [...state.todos, newTodo]
            return {
                ...state,
                todos: addedTodos
            }
        case 'UPDATE_TODO':
            const updatedTodos = state.todos.map( todo => {
                if(todo.id === state.currentTodo.id) {
                    todo.text = action.payload;
                }
                return todo;
            })

            return {
                ...state,
                currentTodo: {},
                todos: updatedTodos
            }
        default:
            return state;
    }
}
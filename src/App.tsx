import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

type TodoType = {
    id: number, val: string
}

type TodoProps = {
    todo: TodoType,
    // function definition by arrow function
    remove: (id: number) => void;
}

type TodoListProps = {
    todos: TodoType[],
    // function definition by arrow function
    remove: (id: number) => void;
}

type TodoFormProps = {
    addTodo: (val: string) => void;
}

const Todo = ({ todo, remove }: TodoProps) => {
    return (
        <li onClick={() => remove(todo.id)}>
            {todo.val}
        </li>
    );
};

const TodoList = ({ todos, remove }: TodoListProps) => {
    return (
        <ul>
            {todos.map(todo => {
                return <Todo key={todo.id} todo={todo} remove={remove} />
            })}
        </ul>
    )

}

const TodoForm = ({ addTodo }: TodoFormProps) => {
    let input: HTMLInputElement;
    return (
        <div>
            <!-- make sure we use correct type here -->
            <input ref={(node: HTMLInputElement) => {
                input = node;
            }} />
            <button onClick={() => {
                addTodo(input.value);
                input.value = "";
            }}>
                +
	    </button>
        </div >
    )
}

const App: React.FC = () => {

    const [todos, setTodos] = useState([
        { id: 0, val: "a" },
        { id: 1, val: "b" }
    ]);

    const [id, setId] = useState(2);
    const handleAdd = (val: string) => {
        let todo = { id: id, val: val };
        todos.push(todo);
        console.log(todos);
        setTodos(todos);
        setId(id + 1);
    }
    const handleRemove = (id: number) => {
        let remainder: TodoType[] = [];
        todos.map(todo => {
            if (todo.id !== id) remainder.push(todo)
        })
        setTodos(remainder);
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Hello world!</p>
                <TodoForm addTodo={handleAdd} />
                <TodoList todos={todos} remove={handleRemove} />
            </header>
        </div>
    );
}

export default App;

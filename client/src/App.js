import './App.css';
import React, { useState, useEffect} from 'react';
import axios from 'axios'; 
  
function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:5000/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (!newTodo) return;
    const response = await axios.post('http://localhost:5000/todos', { text: newTodo });
    setTodos([...todos, response.data]);
    setNewTodo('');
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className='mb-3 text-center'>Todo List</h2>
      <div className='d-flex mb-3'>
        <input
          type="text"
          className='form-control me-2'
          value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button className='btn btn-primary' onClick={addTodo}>Add</button>
      </div>
      <ul className='list-group'>
        {todos.map((todo) => (
          <li key={todo.id} className='list-group-item d-flex justify-content-between align-items-center'>
            {todo.text}
            <button className='btn btn-danger btn-sm' onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

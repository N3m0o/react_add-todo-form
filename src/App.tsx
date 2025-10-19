import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { createTodoAggregates} from './domain/TodoAgregate';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';
import { useState } from 'react';
import { Todo } from './domain/Todo';


export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer)

  const handleAddTodo = (todo: Todo) => {
    setTodos(currentTodos => [...currentTodos, todo])
  }

  const agreggatedTodos = createTodoAggregates(todos, usersFromServer);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm onSubmit={handleAddTodo}/>

      <TodoList todos={agreggatedTodos}/>
    </div>
  );
};

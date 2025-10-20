import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { createTodoAggregates } from './domain/TodoAgregate';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';
import { useState } from 'react';
import { Todo } from './domain/Todo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const handleAddTodo = (newTodoData: Omit<Todo, 'id' | 'user'>) => {
    const maxId = Math.max(...todos.map(todo => todo.id), 0);

    const user = usersFromServer.find(u => u.id === newTodoData.userId);

    if (!user) {
      console.error('User not found for id:', newTodoData.userId);
      return;
    }

    const newTodo: Todo = {
      ...newTodoData,
      id: maxId + 1,
      user,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const aggregatedTodos = createTodoAggregates(todos, usersFromServer);

  return (
    <div className="App">
      <h1>Add todo form</h1>
      
      <AddTodoForm users={usersFromServer} onSubmit={handleAddTodo} />

      <TodoList todos={aggregatedTodos} />
    </div>
  );
};

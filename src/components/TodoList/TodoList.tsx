import { Todo } from '../../domain/Todo';

type TodoListProps = {
  todos: Todo[];
};

export const TodoList = ({ todos }: TodoListProps) => (
  <ul data-cy="todoList">
    {todos.map(todo => (
      <li key={todo.id} className="TodoInfo" data-id={todo.id}>
        <p className="TodoInfo__title">{todo.title}</p>

        {todo.user ? (
          <a href={`mailto:${todo.user.email}`} className="UserInfo">
            {todo.user.name}
          </a>
        ) : (
          <span className="UserInfo">Unknown user</span>
        )}

        <p className="TodoInfo__status">
          {todo.completed ? 'Completed' : 'Not completed'}
        </p>
      </li>
    ))}
  </ul>
);

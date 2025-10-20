import { FormEvent, useState } from 'react';
import { Nullable } from '../../domain/Nullable';
import { Todo } from '../../domain/Todo';
import { User } from '../../domain/User';

type AddTodoFormProps = {
  users: User[];
  onSubmit: (todo: Omit<Todo, 'id' | 'user'>) => void;
};

export const AddTodoForm = ({ users, onSubmit }: AddTodoFormProps) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState<Nullable<string>>(null);

  const [ownerId, setOwnerId] = useState<number>(0);
  const [ownerErrorId, setOwnerErrorId] = useState<Nullable<string>>(null);

  const handleResetForm = () => {
    setTitle('');
    setTitleError(null);
    setOwnerId(0);
    setOwnerErrorId(null);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (titleError) {
      setTitleError(null);
    }

    setTitle(event.target.value.trimStart());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(null);
    setOwnerErrorId(null);

    const normalizedTitle = title.trim();
    let hasError = false;

    if (!normalizedTitle) {
      setTitleError('Please enter a title');
      hasError = true;
    }

    if (ownerId === 0) {
      setOwnerErrorId('Please choose a user');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newTodo = {
      title: normalizedTitle,
      completed: false,
      userId: ownerId,
    };

    onSubmit(newTodo);
    handleResetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={ownerId}
          onChange={event => {
            const newOwnerId = +event.target.value;

            if (ownerErrorId && newOwnerId !== 0) {
              setOwnerErrorId(null);
            }

            setOwnerId(newOwnerId);
          }}
        >
          <option value="0">Choose a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {ownerErrorId && <span className="error">{ownerErrorId}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
import React from 'react';
import './index.css';

const TodoItem = (props) => {
  const {
    todoItem,
    deleteTodo,
    editTodo,
    saveTodo,
    editingTodoId,
    editedTodoTitle,
    onChangeEditedTodoTitle,
  } = props;
  const { id, title } = todoItem;

  const onDeleteTodo = () => {
    deleteTodo(id);
  };

  const onEditTodo = () => {
    editTodo(id);
  };

  const onSaveTodo = () => {
    saveTodo();
  };

  return (
    <li className="list-container">
      {editingTodoId === id ? (
        <div className="input-container2">
          <input
            type="text"
            value={editedTodoTitle}
            onChange={onChangeEditedTodoTitle}
            className="input-element1"
          />
          <button type="button" className="button" onClick={onSaveTodo}>
            Save
          </button>
        </div>
      ) : (
        <div className="todo-container">
          <p className="title">{title}</p>
          <button type="button" className="button" onClick={onDeleteTodo}>
            Delete
          </button>
          <button type="button" className="button" onClick={onEditTodo}>
            Edit
          </button>
        </div>
      )}
    </li>
  );
};

export default TodoItem;

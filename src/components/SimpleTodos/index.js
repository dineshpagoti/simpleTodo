import React, { Component } from 'react';
import TodoItem from '../TodoItem';
import { v4 as uuidv4 } from 'uuid';
import './index.css';

const saveToLocalStorage = (todoList) => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  };
  
  const loadFromLocalStorage = () => {
    const todoList = localStorage.getItem('todoList');
    return todoList ? JSON.parse(todoList) : [];
  };
  



class SimpleTodos extends Component {
  state = {
    todoList: loadFromLocalStorage(),
    inputTodo: '',
    isShow: false,
    editingTodoId: null,
    editedTodoTitle: '',
  };

  deleteTodo = (id) => {
    const { todoList } = this.state;
    const updatedTodoList = todoList.filter((eachItem) => eachItem.id !== id);
    this.setState({ todoList: updatedTodoList });
  };

  editTodo = (id) => {
    const { todoList } = this.state;
    const editingTodo = todoList.find((todo) => todo.id === id);
    this.setState({
      editingTodoId: id,
      editedTodoTitle: editingTodo.title,
    });
  };

  saveTodo = () => {
    const { todoList, editingTodoId, editedTodoTitle } = this.state;
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === editingTodoId) {
        return { ...todo, title: editedTodoTitle };
      }
      return todo;
    });
    this.setState({
      todoList: updatedTodoList,
      editingTodoId: null,
      editedTodoTitle: '',
    });
  };

  onChangeInput = (event) => {
    this.setState({ inputTodo: event.target.value });
  };

  onClickAddBtn = () => {
    const { inputTodo } = this.state;
    const newTodo = {
      id: uuidv4(),
      title: inputTodo,
    };

    this.setState((prevState) => ({
      todoList: [...prevState.todoList, newTodo],
      inputTodo: '',
    }));
  };

  onClickViewAllBtn = () => {
    this.setState((prevState) => ({ isShow: !prevState.isShow }));
  };

  onChangeEditedTodoTitle = (event) => {
    this.setState({ editedTodoTitle: event.target.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todoList !== this.state.todoList) {
      saveToLocalStorage(this.state.todoList);
    }
  }

  render() {
    const { todoList, inputTodo, isShow, editingTodoId, editedTodoTitle } = this.state;
    const btnText = isShow ? 'Hide All' : 'View All';
    const btnClassName = isShow ? 'hide-all-btn' : 'view-all-btn';

    return (
      <div className="app-container">
        <div className="bg-container">
          <h1 className="heading">Simple Todos</h1>
          <div className="input-todo-container">
            <input
              placeholder="Add Todo"
              className="input-element"
              onChange={this.onChangeInput}
              value={inputTodo}
            />
            <button type="button" className="add-btn" onClick={this.onClickAddBtn}>
              Add
            </button>
          </div>
          <button className={btnClassName} onClick={this.onClickViewAllBtn}>
            {btnText}
          </button>
          {isShow ? (
            <ul>
              {todoList.map((eachTodo) => (
                <TodoItem
                  todoItem={eachTodo}
                  key={eachTodo.id}
                  deleteTodo={this.deleteTodo}
                  editTodo={this.editTodo}
                  saveTodo={this.saveTodo}
                  editingTodoId={editingTodoId}
                  editedTodoTitle={editedTodoTitle}
                  onChangeEditedTodoTitle={this.onChangeEditedTodoTitle}
                />
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    );
  }
}

export default SimpleTodos;

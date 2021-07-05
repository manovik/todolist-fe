import React, { Component, createRef, KeyboardEvent } from 'react';
import { patchTodo, deleteTodo } from '../../service/service';
import './todo_item.scss';

export interface TodoItemProps {
  message: string;
  isDone: boolean;
  id: string;
  clickHandler(): void;
  editHandler(): void;
}

export interface TodoItemState {
  editMode: boolean;
  isDone: boolean;
  editMessage: string;
  editMessageBackup: string;
}

interface ItodoItem {
  editInput: React.RefObject<HTMLInputElement>;
}

class TodoItem
  extends Component<TodoItemProps, TodoItemState>
  implements ItodoItem
{
  state: TodoItemState;
  editInput: React.RefObject<HTMLInputElement>;

  constructor(props: TodoItemProps) {
    super(props);
    this.editInput = createRef();
    this.state = {
      isDone: false,
      editMode: false,
      editMessage: '',
      editMessageBackup: '',
    };
  }

  changeHandler = (): void => {
    this.props.clickHandler();
    this.setState({ isDone: !this.state.isDone });
  };

  onClickEdit = (): void => {
    const { editMode } = this.state;
    const { message } = this.props;
    this.setState({
      editMode: !editMode,
      editMessage: message,
      editMessageBackup: message,
    });
  };

  saveTodo = async (): Promise<void> => {
    const { id, editHandler } = this.props;

    await patchTodo(id, this.state.editMessage);
    this.setState({
      editMode: false,
    });

    editHandler();
  };

  editTodo = (): void => {
    this.setState({ editMessage: this.editInput.current!.value });
  };

  abortEditing = (): void => {
    const { editMessageBackup } = this.state;
    this.setState({
      editMessage: editMessageBackup,
      editMode: false,
    });
  };

  keyPressHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.saveTodo();
      this.setState({
        editMode: false,
      });
    }
  };

  deleteItem = async (): Promise<void> => {
    const { id, editHandler } = this.props;
    await deleteTodo(id).then(editHandler);
  };

  render() {
    const { message, isDone } = this.props;
    const { editMode, editMessage } = this.state;
    return (
      <li className="todos__item todo">
        <div className="todo__wrapper">
          <input
            className="todo__chkbx"
            type="checkbox"
            name="isDone"
            id="isDone"
            checked={isDone}
            onChange={this.changeHandler}
          />
          {editMode ? (
            <input
              type="text"
              className="todo__edit"
              value={editMessage}
              ref={this.editInput}
              onChange={this.editTodo}
              onKeyPress={this.keyPressHandler}
            />
          ) : (
            <p className="todo__text">{message}</p>
          )}
        </div>
        <div className="todo__wrapper--sec">
          {editMode ? (
            <button
              className="button button--rsz todo__save-btn"
              onClick={this.saveTodo}
            >
              Save
            </button>
          ) : (
            <button
              className="button button--rsz todo__edit-btn"
              onClick={this.onClickEdit}
            >
              Edit
            </button>
          )}
          {editMode ? (
            <button
              className="button button--rsz todo__abort-btn"
              onClick={this.abortEditing}
            >
              Abort
            </button>
          ) : (
            <button
              className="button button--rsz todo__del-btn"
              onClick={this.deleteItem}
            >
              Delete
            </button>
          )}
        </div>
      </li>
    );
  }
}

export default TodoItem;

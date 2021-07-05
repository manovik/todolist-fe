import { KeyboardEvent, useRef, useState } from 'react';
import { createTodo } from '../../service/service';
import './todo_input.scss';

interface ITodoInput {
  onAdd(): Promise<void>;
}

const TodoInput = ({ onAdd }: ITodoInput) => {
  const input = useRef<HTMLInputElement>(null);
  const ckbx = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useState(false);
  const [messageSend, setMessageSend] = useState(false);

  const addTodoHandler = async (): Promise<void> => {
    const text: string = input.current!.value;
    if (text) {
      await createTodo(text, checked);
      input.current!.value = '';
      setMessageSend(true);
      setTimeout(() => {
        setMessageSend(false);
        setChecked(false);
      }, 2500);
      onAdd();
    }
  };

  const changeHandler = (): void => {
    setChecked(ckbx.current!.checked);
  };

  const keyPressHandler = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      addTodoHandler();
    }
  };

  return (
    <div className="todos__input">
      <div className="todos__input-wrapper">
        <input
          className={`todos__main-input ${messageSend ? 'done' : ''}`}
          type="text"
          name="newTodo"
          id="newTodo"
          ref={input}
          onKeyPress={keyPressHandler}
          placeholder={
            messageSend
              ? 'Your task is saved! Go get it!'
              : 'Type new todo here'
          }
        />
        <div className="todos__input-inner">
          <input
            className="todos__ckbx"
            type="checkbox"
            name="todoCkbx"
            id="todoCkbx"
            ref={ckbx}
            checked={checked}
            onChange={changeHandler}
          />
          <label className="todos__main-input-label" htmlFor="todoCkbx">
            {checked ? 'Completed' : 'Not completed'}
          </label>
        </div>
      </div>

      <button className="button todos__add-btn" onClick={addTodoHandler}>
        Add
      </button>
    </div>
  );
};

export default TodoInput;

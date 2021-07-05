import React, { useEffect, useState } from 'react';
import {
  getNotDeletedTodosCount,
  getTodos,
  setCompleted,
} from '../../service/service';
import TodoItem from '../todo_item/TodoItem';
import PageBar from '../todo_page-bar/PageBar';
import TodoInput from '../todo_input/TodoInput';
import './todo_list.scss';

export interface ITodoListProps {
  itemsOnPage: number;
  page: number;
}

type TodoItemType = {
  deletedAt: Date | null;
  _id: string;
  message: string;
  completed: boolean;
};

type TodoListArray = TodoItemType[];

const TodoList: React.FC<ITodoListProps> = (props: ITodoListProps) => {
  const [todos, setTodos] = useState<TodoListArray>([]);
  const [todosNumber, setTodosNumber] = useState<number>(0);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPageNumber, setcurrentPageNumber] = useState<number>(
    props.page
  );

  const itemsOnPage: number = props.itemsOnPage && 10;

  const refresh = async (page: number, limit: number): Promise<void> => {
    await getTodos(page, limit).then((data) => {
      setTodos(data);
    });
    await getNotDeletedTodosCount().then((data) => {
      setTodosNumber(data);
      createPageArray();
    });
  };

  const createPageArray = (): void => {
    const pageArr: number[] = [];
    const pages: number = Math.ceil(todosNumber / itemsOnPage);

    for (let i = 1; i <= pages; i++) {
      pageArr.push(i);
    }
    setPages(pageArr);
  };

  useEffect(() => {
    refresh(currentPageNumber, itemsOnPage);
    // eslint-disable-next-line
  }, [currentPageNumber, itemsOnPage, todosNumber]);

  const clickHandler = async (
    id: string,
    completed: boolean
  ): Promise<void> => {
    await setCompleted(id, completed);

    await refresh(currentPageNumber, itemsOnPage);
  };

  const editHandler = async (): Promise<void> => {
    await refresh(currentPageNumber, itemsOnPage);
  };

  const onChangePage = async (num: number): Promise<number | void> => {
    await refresh(num, itemsOnPage);
    await setcurrentPageNumber(num);
  };

  return (
    <>
      <TodoInput onAdd={editHandler} />
      <ul className="todos__list">
        {todos.map((todo) => {
          const { _id, message, completed } = todo;
          return (
            <TodoItem
              key={_id}
              message={message}
              isDone={completed}
              id={_id}
              clickHandler={() => clickHandler(_id, completed)}
              editHandler={editHandler}
            />
          );
        })}
      </ul>
      <PageBar
        pages={pages}
        itemsOnPage={itemsOnPage}
        changePage={onChangePage}
      />
    </>
  );
};

export default TodoList;

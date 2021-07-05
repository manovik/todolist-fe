const URL: string = 'http://localhost:8001/';
const URLTodos: string = 'todos/';
const COUNT: string = 'count/';
const headers = {
  'Content-Type': 'application/json',
};

export const getTodos = async (
  page: number = 1,
  limit: number = 10,
  id: string = ''
) => {
  const url = `${URL}${URLTodos}${id}?page=${page}&limit=${limit}`;
  return await fetch(url, { headers }).then((data) => data.json());
};

export const setCompleted = async (id: string, isDone: boolean) => {
  await fetch(URL + URLTodos + id, {
    method: 'PATCH',
    body: JSON.stringify({ completed: !isDone }),
    headers,
  });
};

export const patchTodo = async (id: string, message: string) => {
  await fetch(URL + URLTodos + id, {
    method: 'PATCH',
    body: JSON.stringify({ message }),
    headers,
  });
};

export const createTodo = async (message: string, completed: boolean) => {
  const dataToSend = JSON.stringify({ message, completed });
  await fetch(URL + URLTodos, {
    method: 'POST',
    body: dataToSend,
    headers,
  });
};

export const deleteTodo = async (id: string) => {
  await fetch(URL + URLTodos + id, {
    method: 'DELETE',
    headers,
  });
};

export const getNotDeletedTodosCount = async () => {
  return await fetch(URL + URLTodos + COUNT, {
    method: 'GET',
    headers,
  }).then((data) => data.json());
};

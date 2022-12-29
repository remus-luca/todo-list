const BASE_URL = 'http://localhost:3000';

const server = {
  getTodos(filterByStatus = null) {
    // const url = `${BASE_URL}/todos`;
    const url = `${BASE_URL}/todos?_sort=status&_order=asc${
      Number(filterByStatus) ? '&status=' + filterByStatus : ''
    }`;

    return fetch(url).then((res) => res.json());
  },
  getTodo(id) {
    const url = `${BASE_URL}/todos/${id}`;

    return fetch(url).then((res) => res.json());
  },
  addTodo(todo) {
    const url = `${BASE_URL}/todos`;

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
  },
  updateTodo(payload, id) {
    const url = `${BASE_URL}/todos/${id}`;

    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  },
  removeTodo(id) {
    const url = `${BASE_URL}/todos/${id}`;

    return fetch(url, {
      method: 'DELETE',
    });
  },
};

import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

// const initialState = [];

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

export const useTodos = () => {
    
  const [todos, dispatchTodo] = useReducer(todoReducer, [], init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = {
      type: "Add Todo",
      payload: todo,
    };

    dispatchTodo(action);
  };

  const handleDeleteTodo = (id) => {
    dispatchTodo({
      type: "Remove Todo",
      payload: id,
    });
  };
  const handleToggleTodo = (id) => {
    dispatchTodo({
      type: "Toggle Todo",
      payload: id,
    });
  };
  
  return {
    todos,
    handleToggleTodo,
    handleDeleteTodo,
    handleNewTodo,
    todosCount: todos.length,
    pendingTodosCount : todos.filter(todo => !todo.done).length,
  }
};

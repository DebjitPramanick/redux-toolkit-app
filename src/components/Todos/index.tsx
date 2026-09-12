import { useState } from "react";
import "./index.css";
import { StoreState } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo } from "../../redux/slices/todos.slice";

const Todos = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const { todos } = useSelector((state: StoreState) => state.todosStore);

  console.log("Component", todos);

  const createTodo = () => {
    const title = input.trim();

    if (!title) return;
    dispatch(addTodo({ title }));
    setInput("");
  };

  const toggleTodo = (id: number) => {};

  const removeTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>

      <div className="todo-form">
        <input
          className="todo-input"
          type="text"
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createTodo();
            }
          }}
        />

        <button className="todo-add" onClick={createTodo}>
          Add
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <span onClick={() => toggleTodo(todo.id)}>{todo.title}</span>

            <button className="todo-delete" onClick={() => removeTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;

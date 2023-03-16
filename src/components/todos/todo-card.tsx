import type { TTodo } from "~/types";

import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";

import Description from "../todo-card/description";
import { containerClasses, todoInfoClasses } from "../todo-card/styled";
import TodoCardContainer from "../todo-card";
import { useToggleTodo } from "../todo-card/useToggleTodo";
import ToggleButton from "../todo-card/toggle-button";
import Title from "../todo-card/title";
import EndDate from "../todo-card/endDate";

export default function TodoCard({ todo }: { todo: TTodo }) {
  const location = useLocation();

  const { completed, toggleTodo } = useToggleTodo({
    id: todo.id,
    todoCompleted: todo.completed,
  });

  const filteredBy = location.search.split("=")[1];

  return (
    <NavLink
      to={`todos/${todo.id}${!!filteredBy ? `?filteredBy=${filteredBy}` : ""}`}
      className={({ isActive, isPending }) =>
        clsx(
          containerClasses,
          isActive ? "bg-blue-200" : isPending ? "bg-blue-500" : null,
        )
      }
    >
      <TodoCardContainer>
        <ToggleButton completed={completed} toggleTodo={toggleTodo} />
        <div className={todoInfoClasses}>
          <Title title={todo.title} completed={todo.completed} id={todo.id} />
          <EndDate endDate={todo.endDate} />
          <Description description={todo.description} />
        </div>
      </TodoCardContainer>
    </NavLink>
  );
}

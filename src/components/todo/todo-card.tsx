import type { TTodo } from "~/types";

import { Link } from "react-router-dom";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";

import Description from "../todo-card/description";
import { containerClasses, todoInfoClasses } from "../todo-card/styled";
import TodoCardContainer from "../todo-card";
import { useToggleTodo } from "../todo-card/useToggleTodo";
import ToggleButton from "../todo-card/toggle-button";
import Title from "../todo-card/title";
import EndDate from "../todo-card/endDate";
import Delete from "./delete";

export default function TodoCard({ todo }: { todo: TTodo }) {
  const { completed, toggleTodo } = useToggleTodo({
    id: todo.id,
    todoCompleted: todo.completed,
  });

  return (
    <div className={containerClasses}>
      <TodoCardContainer>
        <ToggleButton completed={completed} toggleTodo={toggleTodo} />
        <div className={todoInfoClasses}>
          <Title title={todo.title} completed={todo.completed} id={todo.id} />
          <EndDate endDate={todo.endDate} />
          <Description description={todo.description} />
        </div>
      </TodoCardContainer>
      <div className="flex items-center justify-end gap-4 shrink-0">
        <Link to={`nestedTodos/${todo.id}/edit`}>
          <PencilSquareIcon className="w-6 h-6 cursor-pointer stroke-2" />
        </Link>
        <Delete action={`nestedTodos/${todo.id}/delete`} />
      </div>
    </div>
  );
}

import type { TTodo } from "~/types";

import { Link, useLoaderData, useParams } from "react-router-dom";
import TodoCard from "./todo-card";
import { PrimaryButton } from "../utilities/button";

export default function NestedTodos() {
  const { nestedTodos } = useLoaderData() as { nestedTodos: TTodo[] };
  const { todoId } = useParams();

  return (
    <div className="w-full h-[calc(100%-56px)] overflow-y-auto py-4">
      <div className="w-full flex flex-col gap-8">
        {nestedTodos.length > 0 ? (
          nestedTodos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
        ) : (
          <div className="flex flex-col gap-8 items-center">
            <p className="text-xl">This todo does not have sub todos yet</p>
            <Link to={`/todos/${todoId}/add`} className="w-11/12 max-w-xs">
              <PrimaryButton>Add todo</PrimaryButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

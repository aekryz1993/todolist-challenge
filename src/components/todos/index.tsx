import type { TTodo } from "~/types";

import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import clsx from "clsx";
import { PlusIcon } from "@heroicons/react/24/outline";

import TodoCard from "./todo-card";
import Navbar from "../navbar";
import { PrimaryButton } from "../utilities/button";
import { buttonClasses } from "../utilities/button/styled";

export default function Todos() {
  const { todos } = useLoaderData() as { todos: TTodo[] };

  const { todoId } = useParams();

  return (
    <div
      className={clsx(
        "w-full h-full overflow-hidden flex justify-center xl:justify-start",
      )}
    >
      <div
        className={clsx(
          !!todoId && "hidden xl:flex",
          "w-full relative max-w-[768px] xl:w-2/4 xl:max-w-[768px] xl:shrink-0 overflow-hidden flex flex-col",
        )}
      >
        <Navbar />
        <div className="overflow-y-auto overflow-x-hidden py-4 flex flex-col gap-8">
          {todos.length > 0 ? (
            todos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-lg">This todo does not have sub todos yet</p>
            </div>
          )}
        </div>
        <div className="border-t border-t-border-pry h-20 shrink-0 flex flex-col justify-center items-center">
          <Link
            to="todos/add"
            className="w-full max-w-[90%] xl:max-w-[75%] flex items-center justify-center"
          >
            <PrimaryButton classes={clsx(buttonClasses)}>
              <PlusIcon className="inline w-5 h-5 stroke-[3] mr-2" /> Add todo
            </PrimaryButton>
          </Link>
        </div>
      </div>
      <Outlet context={todos} />
    </div>
  );
}

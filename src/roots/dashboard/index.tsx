import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import type { TTodo } from "~/types";

import { redirect } from "react-router-dom";

import Todos from "~/components/todos";
import { apiUrl, getMyHeader } from "~/helper";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const completed = formData.get("completed");
  const todoId = formData.get("todoId");

  if (
    (typeof completed === "string" && !["true", "false"].includes(completed)) ||
    typeof completed !== "string" ||
    typeof todoId !== "string"
  )
    throw new Response("", {
      status: 400,
      statusText: "Form not submitted correctly",
    });

  try {
    const myHeaders = getMyHeader();
    const response = await fetch(apiUrl(`todos/${todoId}`), {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify({
        completed: completed === "true",
      }),
    });
    const todo = await response.json();
    return { todo };
  } catch (error: any) {
    throw new Response("", {
      status: 500,
      statusText: error.message,
    });
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = localStorage.getItem("userId");
  if (!userId) return redirect("/authentication");
  const url = new URL(request.url);
  const filteredBy = url.searchParams.get("filteredBy");
  try {
    const response = await fetch(apiUrl(`todos?userId=${userId}`));
    let todos = (await response.json()) as TTodo[];
    todos = todos.sort((a, b) => a.pos - b.pos);
    if (!filteredBy || filteredBy === "All") return { todos };

    if (["Completed", "Uncompleted"].includes(filteredBy)) {
      todos = todos.filter((todo) =>
        filteredBy === "Completed" ? todo.completed : !todo.completed,
      );
      return { todos };
    }
    if (filteredBy === "Today") {
      const today = new Date();
      const formattedTodayDate = `${
        today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()
      }/${
        today.getMonth() + 1 < 10
          ? `0${today.getMonth() + 1}`
          : today.getMonth() + 1
      }/${today.getFullYear()}`;
      todos = todos.filter((todo) => todo.endDate === formattedTodayDate);
      return { todos };
    }
  } catch (error: any) {
    throw new Response("", {
      status: 500,
      statusText: error.message,
    });
  }
}

function TodosRoute() {
  return <Todos />;
}

export default TodosRoute;

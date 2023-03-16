import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";

import Todo from "~/components/todo";
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
    const response = await fetch(apiUrl(`nestedTodos/${todoId}`), {
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

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const todoId = params.todoId;
    const response = await fetch(apiUrl(`nestedTodos?todoId=${todoId}`));
    const nestedTodos = await response.json();
    return { nestedTodos };
  } catch (error: any) {
    throw new Response("", {
      status: 500,
      statusText: error.message,
    });
  }
}

function TodoRoute() {
  return <Todo />;
}

export default TodoRoute;

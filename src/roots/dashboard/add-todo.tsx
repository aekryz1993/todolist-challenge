import type { TTodo } from "~/types";
import type { ActionFunctionArgs } from "react-router-dom";

import { redirect } from "react-router-dom";
import AddTodo from "~/components/add-todo";

import { apiUrl, formattedDate, getMyHeader } from "~/helper";

export interface TBody {
  userId: string;
  title: string;
  description?: string | null;
  completed?: boolean;
  endDate?: string;
  pos?: number;
}

export async function action({ request }: ActionFunctionArgs) {
  const userId = localStorage.getItem("userId");
  if (!userId) return redirect("/authentication");
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const endDate = formData.get("endDate");

  const formattedEndDate = formattedDate(endDate);

  if (typeof title !== "string" || typeof description !== "string")
    throw new Response("", {
      status: 500,
      statusText: "Form not submitted correctly",
    });

  if (!title) return { fieldsError: "Title field must be provided" };

  const body: TBody = {
    userId,
    title,
    completed: false,
  };

  if (!!description) body.description = description;
  if (!!formattedEndDate) body.endDate = formattedEndDate;

  try {
    const todosResponse = await fetch(apiUrl(`todos?userId=${userId}`));
    let todos = (await todosResponse.json()) as TTodo[];
    todos = todos.sort((a, b) => a.pos - b.pos);
    body.pos = todos.length > 0 ? todos[todos.length - 1].pos + 1 ?? 1 : 1;
    const myHeaders = getMyHeader();
    const response = await fetch(apiUrl(`todos`), {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body),
    });
    const todo = await response.json();
    return redirect(`/todos/${todo.id}`);
  } catch (error: any) {
    throw new Response("", {
      status: 500,
      statusText: error.message,
    });
  }
}

export default function AddTodoRoute() {
  return <AddTodo />;
}

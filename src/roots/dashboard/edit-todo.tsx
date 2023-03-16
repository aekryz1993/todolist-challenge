import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import type { TTodo } from "~/types";

import { redirect } from "react-router-dom";

import EditTodo from "~/components/edit-todo";
import { apiUrl, formattedDate, getMyHeader } from "~/helper";

export interface TBody {
  title: string;
  description?: string | null;
  endDate?: string;
}

export async function action({ request, params }: ActionFunctionArgs) {
  const { todoId } = params;
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const endDate = formData.get("endDate");

  const formattedEndDate = formattedDate(endDate);

  if (typeof todoId !== "string")
    throw new Response("", {
      status: 500,
      statusText: "Form not submitted correctly",
    });

  if (typeof title !== "string" || typeof description !== "string")
    throw new Response("", {
      status: 500,
      statusText: "Form not submitted correctly",
    });

  if (!title) return { fieldsError: "Title field must be provided" };

  const body: TBody = {
    title,
  };

  if (!!description) body.description = description;
  if (!!formattedEndDate) body.endDate = formattedEndDate;

  try {
    const myHeaders = getMyHeader();
    await fetch(apiUrl(`todos/${todoId}`), {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(body),
    });
    return redirect(`/todos/${todoId}`);
  } catch (error: any) {
    throw new Response("", {
      status: 500,
      statusText: error.message,
    });
  }
}

export async function loader({ params }: LoaderFunctionArgs) {
  const userId = localStorage.getItem("userId");
  if (!userId) return redirect("/authentication");
  try {
    const todoId = params.todoId;
    const response = await fetch(apiUrl(`todos?userId=${userId}`));
    const todos = (await response.json()) as TTodo[];
    const todo = todos.find((todo) => todo.id == todoId) as TTodo;
    return {
      title: todo.title,
      description: todo.description,
      endDate: todo.endDate,
    };
  } catch (error: any) {
    throw new Response("", {
      status: 500,
      statusText: error.message,
    });
  }
}

export default function EditTodoRoute() {
  const todo = useLoaderData() as {
    title: string;
    description: string | undefined;
    endDate: string | undefined;
  };

  return <EditTodo {...todo} />;
}

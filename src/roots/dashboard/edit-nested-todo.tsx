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
  const { todoId, nestedTodoId } = params;
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const endDate = formData.get("endDate");

  const formattedEndDate = formattedDate(endDate);

  if (typeof nestedTodoId !== "string")
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
    await fetch(apiUrl(`nestedTodos/${nestedTodoId}`), {
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
  try {
    const { nestedTodoId, todoId } = params;
    const response = await fetch(apiUrl(`nestedTodos?todoId=${todoId}`));
    const todos = (await response.json()) as TTodo[];
    const todo = todos.find((todo) => todo.id == nestedTodoId) as TTodo;
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

export default function EditNestedTodoRoute() {
  const todo = useLoaderData() as {
    title: string;
    description: string | undefined;
    endDate: string | undefined;
  };

  return <EditTodo {...todo} />;
}

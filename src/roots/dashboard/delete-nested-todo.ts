
import type {
  ActionFunctionArgs,
} from "react-router-dom";

import { redirect } from "react-router-dom";

import { apiUrl } from '~/helper';

export async function action({ params }: ActionFunctionArgs) {
  const { todoId, nestedTodoId } = params

  try {
    const response = await fetch(apiUrl(`nestedTodos/${nestedTodoId}`), {
      method: 'DELETE'
    })
    const status = await response.status
    if (status === 200) return redirect(`/todos/${todoId}`)
  } catch (error: any) {
    throw new Response("", {
      status: 500,
      statusText: error.message,
    });
  }
}

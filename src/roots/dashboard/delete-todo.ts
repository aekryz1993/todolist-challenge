
import type {
  ActionFunctionArgs,
} from "react-router-dom";
import type { TTodo } from "~/types";

import { redirect } from "react-router-dom";

import { apiUrl } from '~/helper';

export async function action({ params }: ActionFunctionArgs) {
  const { todoId } = params

  try {
    const nestedTodosResponse = await fetch(apiUrl(`nestedTodos?todoId=${todoId}`))
    const nestedTodos = await nestedTodosResponse.json() as TTodo[]
    await Promise.all(nestedTodos.map(todo => {
      fetch(apiUrl(`nestedTodos/${todo.id}`), {
        method: 'DELETE'
      })
      return null
    }))
    const response = await fetch(apiUrl(`todos/${todoId}`), {
      method: 'DELETE'
    })
    const status = await response.status
    if (status === 200) return redirect('/')
  } catch (error: any) {
    throw new Response("", {
      status: 500,
      statusText: error.message,
    });
  }
}

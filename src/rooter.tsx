import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import AppRoot, { loader as rootLoader } from "./roots/root";
import { action as logoutLoader } from "./roots/logout";
import ErrorPage from "./components/error-page";
import Authentication, {
  loader as authenticationLoader,
  action as authenticationAction,
} from "./roots/authentication";
import TodosRoute, {
  loader as todosLoader,
  action as todosAction,
} from "./roots/dashboard";
import TodoRoute, {
  loader as todoLoader,
  action as todoAction,
} from "./roots/dashboard/todoId";
import AddNestedTodo, {
  action as addNestedTodoAction,
} from "./roots/dashboard/add-nested-todo";
import EditTodoRoute, {
  loader as editTodoLoader,
  action as editTodoAction,
} from "./roots/dashboard/edit-todo";
import { action as deleteTodoAction } from "./roots/dashboard/delete-todo";
import AddTodoRoute, {
  action as addTodoAction,
} from "./roots/dashboard/add-todo";
import EditNestedTodoRoute, {
  loader as editNestedTodoLoader,
  action as editNestedTodoAction,
} from "./roots/dashboard/edit-nested-todo";
import { action as deleteNestedTodoAction } from "./roots/dashboard/delete-nested-todo";
import TodoIndex from "./roots/dashboard/todo-index";

export const router = createBrowserRouter(
  createRoutesFromElements([
    <Route
      path="/"
      element={<AppRoot />}
      loader={rootLoader}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route
          path="/"
          element={<TodosRoute />}
          loader={todosLoader}
          action={todosAction}
        >
          <Route index element={<TodoIndex />} />
          <Route
            path="todos/:todoId"
            element={<TodoRoute />}
            loader={todoLoader}
            action={todoAction}
          />
          <Route
            path="todos/add"
            element={<AddTodoRoute />}
            action={addTodoAction}
          />
          <Route
            path="todos/:todoId/add"
            element={<AddNestedTodo />}
            action={addNestedTodoAction}
          />
          <Route
            path="todos/:todoId/edit"
            element={<EditTodoRoute />}
            loader={editTodoLoader}
            action={editTodoAction}
          />
          <Route
            path="todos/:todoId/nestedTodos/:nestedTodoId/edit"
            element={<EditNestedTodoRoute />}
            loader={editNestedTodoLoader}
            action={editNestedTodoAction}
          />
          <Route
            path="todos/:todoId/nestedTodos/:nestedTodoId/delete"
            action={deleteNestedTodoAction}
          />
          <Route path="todos/:todoId/delete" action={deleteTodoAction} />
        </Route>
        <Route path="/logout" action={logoutLoader} />
      </Route>
    </Route>,
    <Route
      path="/authentication"
      element={<Authentication />}
      loader={authenticationLoader}
      action={authenticationAction}
      errorElement={<ErrorPage />}
    />,
  ]),
);

import TodoForm from "../todo-form";
import TodoFormContainer from "../todo-form/container";
import TodoFormHeader from "../todo-form/header";

export default function AddTodo() {
  return (
    <TodoFormContainer>
      <TodoFormHeader title="Add todo" />
      <TodoForm buttonLabel="Add new todo" />
    </TodoFormContainer>
  );
}

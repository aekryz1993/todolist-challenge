import { formattedInputDate } from "~/helper";
import TodoForm from "../todo-form";
import TodoFormContainer from "../todo-form/container";
import TodoFormHeader from "../todo-form/header";

export default function EditTodo({
  title,
  description,
  endDate,
}: {
  title: string;
  description: string | undefined;
  endDate: string | undefined;
}) {
  return (
    <TodoFormContainer>
      <TodoFormHeader title="Edit todo" />
      <TodoForm
        buttonLabel="Update"
        title={title}
        description={description}
        endDate={formattedInputDate(endDate)}
      />
    </TodoFormContainer>
  );
}

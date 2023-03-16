import { useFetcher } from "react-router-dom";

export const useToggleTodo = ({
  todoCompleted,
  id,
}: {
  todoCompleted: boolean;
  id: string;
}) => {
  const fetcher = useFetcher();

  let completed = fetcher.data?.todo?.completed || todoCompleted;
  if (fetcher.formData) {
    completed = fetcher.formData.get("completed") === "true";
  }

  const toggleTodo = () => {
    const formData = new FormData();
    formData.append("todoId", id);
    formData.append("completed", completed ? "false" : "true");
    fetcher.submit(formData, { method: "patch" });
  };

  return { toggleTodo, completed }
}
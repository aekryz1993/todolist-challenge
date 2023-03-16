import { useParams } from "react-router-dom";
import Header from "./header";
import NestedTodos from "./nested-todos";
import clsx from "clsx";

export default function Todo() {
  const { todoId } = useParams();

  return (
    <div
      className={clsx(
        !todoId && "hidden xl:flex",
        "w-full h-full flex flex-col",
      )}
    >
      <Header />
      <NestedTodos />
    </div>
  );
}

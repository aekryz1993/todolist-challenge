import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/24/outline";
import { toggleBtnClasses } from "./styled";

export default function ToggleButton({
  completed,
  toggleTodo,
}: {
  completed: boolean;
  toggleTodo: () => void;
}) {
  return (
    <button
      className={clsx(toggleBtnClasses, completed && "bg-blue-500")}
      onClick={(event) => {
        event.preventDefault();
        toggleTodo();
      }}
    >
      {completed ? (
        <CheckIcon className="h-5 w-5 text-white stroke-[4]" />
      ) : null}
    </button>
  );
}

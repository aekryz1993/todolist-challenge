import clsx from "clsx";

export default function Title({
  title,
  completed,
  id,
}: {
  title: string;
  completed: boolean;
  id: string;
}) {
  return (
    <label
      className={clsx(
        "max-w-sm whitespace-nowrap text-ellipsis overflow-x-hidden cursor-pointer",
        completed && "line-through",
      )}
      htmlFor={id}
    >
      {title}
    </label>
  );
}

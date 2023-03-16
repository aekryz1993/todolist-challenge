import { useState } from "react";
import clsx from "clsx";
import { useTextWidth } from "@tag0/use-text-width";

export default function Description({
  description,
}: {
  description: string | undefined;
}) {
  const [isDisplay, setIsDisplay] = useState(false);
  const textWidth = useTextWidth({ text: description });

  const toggleIsDisplay = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setIsDisplay((prevState) => !prevState);
  };

  return (
    <div
      className={clsx(
        "select-none flex text-text-sec text-sm",
        isDisplay ? "items-end" : "items-center",
      )}
    >
      <span
        className={clsx(
          "inline-block max-w-[183px] md:max-w-xs",
          isDisplay
            ? "overflow-auto break-words"
            : "whitespace-nowrap text-ellipsis overflow-hidden",
        )}
      >
        {description}
      </span>
      {textWidth > 375 && (
        <span
          className="text-blue-500 underline ml-1"
          onClick={toggleIsDisplay}
        >
          {isDisplay ? "see less" : "see more"}
        </span>
      )}
    </div>
  );
}

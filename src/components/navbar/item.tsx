import { Form, useLocation } from "react-router-dom";
import clsx from "clsx";

import { NavItem } from ".";

export default function Item({ filteredBy }: { filteredBy: NavItem }) {
  const location = useLocation();

  const selected = location.search.split("=")[1];

  return (
    <Form
      className={clsx(
        "h-full px-4 flex flex-col items-center justify-center transition-all",
        selected === filteredBy && "border-b-4 border-b-blue-500",
        !selected &&
          filteredBy === NavItem.All &&
          "border-b-4 border-b-blue-500",
      )}
    >
      <input
        type="hidden"
        name="filteredBy"
        value={filteredBy === NavItem.All ? undefined : filteredBy}
      />
      <button type="submit">
        <span
          className={clsx(
            selected === filteredBy && "text-blue-500",
            !selected && filteredBy === NavItem.All && "text-blue-500",
          )}
        >
          {filteredBy}
        </span>
      </button>
    </Form>
  );
}

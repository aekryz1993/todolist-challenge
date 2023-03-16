import type { TTodo } from "~/types";

import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import {
  ArrowLeftIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Delete from "./delete";

export default function Header() {
  const navigate = useNavigate();
  const { todoId } = useParams();
  const todos = useOutletContext() as TTodo[];

  const todo = todos?.find((todo) => todo.id == todoId);

  return (
    <div className="w-full flex justify-between items-center px-8 py-4 border-b border-b-border-pry">
      <div className="flex items-center gap-2">
        <ArrowLeftIcon
          className="w-7 h-7 stroke-[3] xl:hidden"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-2xl max-w-[212px] md:max-w-xs whitespace-nowrap text-ellipsis overflow-x-hidden">
          {todo?.title}
        </h1>
      </div>
      <div className="flex items-center justify-end gap-4 lg:gap-8 shrink-0">
        <Link to="edit">
          <PencilSquareIcon className="w-7 h-7 cursor-pointer stroke-2" />
        </Link>
        <Link to="add">
          <PlusIcon className="w-7 h-7 cursor-pointer stroke-2" />
        </Link>
        <Delete action="delete" />
      </div>
    </div>
  );
}

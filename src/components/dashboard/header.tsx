import type { TUser } from "~/types";

import { Form, Link, useLoaderData } from "react-router-dom";

export default function Header() {
  const { user } = useLoaderData() as { user: TUser };

  return (
    <div className="w-full h-14 flex items-center justify-between shrink-0 bg-bg-sec shadow px-2 sm:px-4 select-none">
      <Link to="/" className="text-2xl sm:text-4xl tracking-wider font-bold">
        Todolist
      </Link>
      <div className="flex items-center gap-4 sm:gap-12">
        <p className="">{user.email}</p>
        <Form method="post" action="logout">
          <button
            type="submit"
            className="text-blue-500 font-semibold cursor-pointer"
          >
            Log Out
          </button>
        </Form>
      </div>
    </div>
  );
}

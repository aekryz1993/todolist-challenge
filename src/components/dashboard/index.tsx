import type { TUser } from "~/types";

import { Outlet, useLoaderData } from "react-router-dom";

import Header from "./header";
import Main from "./main";

export default function Dashboard() {
  const { user } = useLoaderData() as { user: TUser };

  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <div className="h-[calc(100%-56px)] w-full shrink grow flex">
        <Main>
          <Outlet context={{ user }} />
        </Main>
      </div>
    </div>
  );
}

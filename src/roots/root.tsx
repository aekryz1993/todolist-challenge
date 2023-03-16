import { redirect } from "react-router-dom";

import { apiUrl } from "~/helper";
import Dashboard from "~/components/dashboard";

export async function loader() {
  const email = localStorage.getItem("email");
  if (!email) return redirect("/authentication");
  try {
    const response = await fetch(apiUrl(`authentification?email=${email}`));
    const users = await response.json();
    if (users.length > 0) return { user: users[0] };
    return redirect("/authentication");
  } catch (error: any) {
    throw new Response("", {
      status: 500,
      statusText: error.message,
    });
  }
}

export default function Root() {
  return <Dashboard />;
}

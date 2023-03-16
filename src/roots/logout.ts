import { redirect } from "react-router-dom";

export async function action() {
  localStorage.removeItem('email');
  return redirect("/authentication");
}

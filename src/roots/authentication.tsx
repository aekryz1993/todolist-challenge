import type { ActionFunctionArgs } from "react-router-dom";

import { redirect } from "react-router-dom";

import AuthenticationLayout from "~/components/authentication-layout";
import { apiUrl, getMyHeader, isValidEmail } from "~/helper";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const authType = formData.get("authType");
  const email = formData.get("email");

  if (typeof authType !== "string")
    throw new Response("", {
      status: 400,
      statusText: "Form not submitted correctly.",
    });

  if (authType === "reset") return null;

  if (typeof email !== "string")
    return { formError: "Form not submitted correctly." };

  if (!isValidEmail(email)) return { fieldsError: "Invalid email format" };

  try {
    switch (authType) {
      case "login": {
        const loginResponse = await fetch(
          apiUrl(`authentification?email=${email}`),
        );
        const users = await loginResponse.json();
        if (users.length > 0) {
          localStorage.setItem("email", email);
          localStorage.setItem("userId", users[0].id);
          return redirect("/");
        }
        return { formError: `${email} is not exist` };
      }
      case "register": {
        const userResponse = await fetch(
          apiUrl(`authentification?email=${email}`),
        );
        const users = await userResponse.json();
        if (users.length > 0) return { formError: `${email} is already exist` };
        const myHeaders = getMyHeader();
        const registerResponse = await fetch(apiUrl(`authentification`), {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({
            email,
          }),
        });
        const user = await registerResponse.json();
        localStorage.setItem("email", user.email);
        localStorage.setItem("userId", user.id);
        return redirect("/");
      }
    }
  } catch (error: any) {
    return new Response("", {
      status: 500,
      statusText: error.message,
    });
  }
}

export async function loader() {
  const email = localStorage.getItem("email");
  if (!email) return null;
  try {
    const response = await fetch(apiUrl(`authentification?email=${email}`));
    const users = await response.json();
    if (users.length > 0) return redirect("/");
    return null;
  } catch (error: any) {
    throw new Response("", {
      status: 500,
      statusText: error.message,
    });
  }
}

export default function Authentication() {
  return <AuthenticationLayout />;
}

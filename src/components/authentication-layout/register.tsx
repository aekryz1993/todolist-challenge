import type { TSetScreen } from ".";

import AuthForm from "./auth-form";
import { useChangeScreen } from "./useChangeScreen";

export default function Register({ setScreen }: { setScreen: TSetScreen }) {
  const handleChangeScreen = useChangeScreen({ setScreen, to: "LOGIN" });

  return (
    <AuthForm authType="register">
      You already have an account?
      <span
        className="text-blue-600 cursor-pointer ml-1"
        onClick={handleChangeScreen}
      >
        Log in
      </span>
    </AuthForm>
  );
}

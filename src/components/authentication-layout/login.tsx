import type { TSetScreen } from ".";

import AuthForm from "./auth-form";
import { useChangeScreen } from "./useChangeScreen";

export default function Login({ setScreen }: { setScreen: TSetScreen }) {
  const handleChangeScreen = useChangeScreen({ setScreen, to: "REGISTER" });

  return (
    <AuthForm authType="login">
      Don't have an account?
      <span
        className="text-blue-600 cursor-pointer ml-1"
        onClick={handleChangeScreen}
      >
        Create One
      </span>
    </AuthForm>
  );
}

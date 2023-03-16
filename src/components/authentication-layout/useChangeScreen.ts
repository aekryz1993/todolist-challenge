import type { TSetScreen } from ".";

import { useSubmit } from "react-router-dom";

export const useChangeScreen = ({ setScreen, to }: { setScreen: TSetScreen, to: 'REGISTER' | 'LOGIN' }) => {
  const submit = useSubmit();

  return () => {
    setScreen(to);
    const formData = new FormData();
    formData.append("authType", "reset");
    submit(formData, { method: "post", replace: true });
  };
}
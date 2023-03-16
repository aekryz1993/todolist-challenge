import React from "react";

import Register from "./register";
import Login from "./login";

export type TSetScreen = React.Dispatch<
  React.SetStateAction<"LOGIN" | "REGISTER">
>;

const componentMap = {
  LOGIN: Login,
  REGISTER: Register,
  EMPTY: () => null,
};

export default function AuthenticationLayout() {
  const [screen, setScreen] = React.useState<"LOGIN" | "REGISTER">("LOGIN");

  const Component =
    componentMap[
      screen === "LOGIN"
        ? "LOGIN"
        : screen === "REGISTER"
        ? "REGISTER"
        : "EMPTY"
    ];

  return (
    <div className="w-full h-full flex justify-center overflow-y-auto">
      <Component setScreen={setScreen} />
    </div>
  );
}

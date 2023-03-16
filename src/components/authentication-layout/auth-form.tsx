import { Form, useActionData } from "react-router-dom";

import { InputField } from "../utilities/input";
import { formClasses } from "./styled";
import { PrimaryButton } from "../utilities/button";

export default function AuthForm({
  authType,
  children,
}: {
  authType: string;
  children: React.ReactNode;
}) {
  const actionData = useActionData() as {
    fieldsError?: string;
    formError?: string;
  };
  const label = authType.charAt(0).toUpperCase() + authType.slice(1);

  return (
    <Form method="post" className={formClasses}>
      <div className="w-full flex flex-col justify-center items-center gap-20">
        <div className="w-full">
          <h2 className="text-3xl text-center font-semibold">{label}</h2>
        </div>
        <div className="w-full max-w-[400px] flex flex-col items-center gap-10">
          <input type="hidden" name="authType" value={authType} />
          <div className="flex flex-col w-full">
            <InputField
              type="email"
              name="email"
              label="Email"
              error={actionData?.fieldsError}
            />
            {actionData?.fieldsError && (
              <p className="text-alert-danger text-sm">
                {actionData?.fieldsError}
              </p>
            )}
          </div>
          <PrimaryButton type="submit">
            <span className="text-lg">{label}</span>
          </PrimaryButton>
          {actionData?.formError && (
            <div>
              <p className="text-alert-danger text-sm">
                {actionData?.formError}
              </p>
            </div>
          )}
          <div className="mt-0 w-full">
            <p className="text-sm text-center">{children}</p>
          </div>
        </div>
      </div>
    </Form>
  );
}

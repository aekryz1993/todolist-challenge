import { Form, useActionData } from "react-router-dom";

import { InputField, TextareaField } from "../utilities/input";
import { PrimaryButton } from "../utilities/button";

export default function TodoForm({
  title,
  description,
  endDate,
  buttonLabel,
}: {
  buttonLabel: string;
  title?: string;
  description?: string;
  endDate?: string;
}) {
  const actionData = useActionData() as {
    fieldsError?: string;
    formError?: string;
  };

  return (
    <Form
      method="post"
      className="ml-8 w-[calc(100%-32px)] max-w-lg h-[calc(100%-40px)] flex flex-col"
    >
      <div className="flex flex-col gap-8 pb-8 border-b border-b-border-pry">
        <div className="w-full flex flex-col">
          <InputField
            type="text"
            name="title"
            label="Title"
            error={actionData?.fieldsError}
            defaultValue={title}
          />
          {actionData?.fieldsError && (
            <p className="text-alert-danger text-sm">
              {actionData?.fieldsError}
            </p>
          )}
        </div>
        <TextareaField
          name="description"
          label="Description"
          defaultValue={description}
        />
        <InputField
          type="date"
          min="1700-01-01"
          max="3000-12-31"
          name="endDate"
          defaultValue={endDate}
        />
      </div>
      <div className="py-8">
        <PrimaryButton type="submit">{buttonLabel}</PrimaryButton>
      </div>
    </Form>
  );
}

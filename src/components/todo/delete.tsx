import { TrashIcon } from "@heroicons/react/24/solid";
import { useCallback, useState } from "react";
import { Portal } from "../portal";
import { CancelButton, PrimaryButton } from "../utilities/button";
import { Form } from "react-router-dom";

export default function Delete({ action }: { action: string }) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsAlertOpen(false);
  }, []);

  return (
    <>
      <TrashIcon
        className="w-6 h-6 cursor-pointer"
        onClick={() => setIsAlertOpen((prevState) => !prevState)}
      />
      {isAlertOpen && (
        <Portal
          id="delete-todo"
          rootClasses="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-[rgba(0,0,0,0.7)]"
          containerClasses="relative flex flex-col justify-center max-h-[calc(100%-40px)] overflow-y-auto shadow-3xl bg-bg-sec"
          handleClose={handleClose}
        >
          <div className="flex flex-col justify-center p-8">
            <div className="w-full mb-4">
              <p className="">
                Are you sure you want to permanently delete this todo?
              </p>
            </div>
            <Form
              method="post"
              action={action}
              className="flex items-center gap-8"
            >
              <CancelButton onClick={handleClose}>Cancel</CancelButton>
              <PrimaryButton type="submit">Confirm</PrimaryButton>
            </Form>
          </div>
        </Portal>
      )}
    </>
  );
}

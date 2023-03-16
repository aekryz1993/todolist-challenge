import type { TInputState } from "./type";

import clsx from "clsx";

const inputClasses = "relative w-full rounded-lg bg-transparent p-3.5 z-10";

const inputBlurClasses = "border border-gray-300";

const inputFocusClasses =
  "border border-gray-900 outline-btn-pry outline-2 pt-6 outline outline-offset-1";

const inputLabelClasses = "absolute left-3 transition-all select-none z-0";

const inputLabelFocusClasses = "top-1 text-sm text-btn-pry";

const inputLabelBlurClasses = "text-gray-500";

const inputStateClasses = ({ isFocus, isEmpty, error }: TInputState) =>
  clsx(
    inputClasses,
    error
      ? "border border-alert-danger"
      : isFocus
      ? inputFocusClasses
      : inputBlurClasses,
    !isEmpty && "pt-6",
  );

export {
  inputLabelClasses,
  inputLabelFocusClasses,
  inputLabelBlurClasses,
  inputStateClasses,
};

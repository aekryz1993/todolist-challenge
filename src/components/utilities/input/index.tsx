import type {
  TEventHandlerProps,
  TInputProps,
  TInputState,
  TTextareaProps,
} from "./type";

import { forwardRef, useState } from "react";
import clsx from "clsx";
import {
  inputLabelClasses,
  inputStateClasses,
  inputLabelBlurClasses,
  inputLabelFocusClasses,
} from "./styled";

const isEmpty = (value: string) =>
  typeof value === "string" ? value.length === 0 : typeof value === "number";

const InputField = forwardRef<
  HTMLInputElement,
  TInputProps & TEventHandlerProps
>(function InputField(props, ref) {
  const [inputState, setInputState] = useState<TInputState>({
    isFocus: false,
    isEmpty: props.defaultValue || props.value ? false : true,
  });

  const { classes, label, error, handleSetOpen, ...inputProps } = props;

  const handleFocus = (value: string) => {
    handleSetOpen?.();
    setInputState(() =>
      isEmpty(value)
        ? { isFocus: true, isEmpty: true }
        : { isFocus: true, isEmpty: false },
    );
  };

  const handleBlur = (value: string) => {
    setInputState(() =>
      isEmpty(value)
        ? { isFocus: false, isEmpty: true }
        : { isFocus: false, isEmpty: false },
    );
  };

  return (
    <div className={clsx("relative w-full", classes)}>
      <span
        className={clsx(
          inputLabelClasses,
          !!error && "text-alert-danger",
          inputState.isFocus
            ? inputLabelFocusClasses
            : inputState.isEmpty
            ? clsx(inputLabelBlurClasses, "top-2/4 -translate-y-2/4")
            : "top-1 text-sm text-gray-500",
        )}
      >
        {label}
      </span>
      <input
        {...inputProps}
        className={inputStateClasses({
          isFocus: inputState.isFocus,
          isEmpty: inputState.isEmpty,
          error,
        })}
        onFocus={(event) => handleFocus(event.target.value)}
        onBlur={(event) => handleBlur(event.target.value)}
        ref={ref}
      />
    </div>
  );
});

const TextareaField = forwardRef<HTMLTextAreaElement, TTextareaProps>(
  function TextareaField(props, ref) {
    const [inputState, setInputState] = useState<TInputState>({
      isFocus: false,
      isEmpty: props.defaultValue || props.value ? false : true,
    });

    const { classes, label, ...textareaProps } = props;

    const handleFocus = (value: string) => {
      setInputState(() =>
        isEmpty(value)
          ? { isFocus: true, isEmpty: true }
          : { isFocus: true, isEmpty: false },
      );
    };

    const handleBlur = (value: string) => {
      setInputState(() =>
        isEmpty(value)
          ? { isFocus: false, isEmpty: true }
          : { isFocus: false, isEmpty: false },
      );
    };

    return (
      <div className={clsx("relative w-full", classes)}>
        <span
          className={clsx(
            inputLabelClasses,
            inputState.isFocus
              ? inputLabelFocusClasses
              : inputState.isEmpty
              ? clsx(inputLabelBlurClasses, "top-4")
              : "top-1 text-sm text-gray-500",
          )}
        >
          {label}
        </span>
        <textarea
          {...textareaProps}
          className={inputStateClasses({
            isFocus: inputState.isFocus,
            isEmpty: inputState.isEmpty,
          })}
          rows={4}
          maxLength={150}
          onFocus={(event) => handleFocus(event.target.value)}
          onBlur={(event) => handleBlur(event.target.value)}
          ref={ref}
        />
      </div>
    );
  },
);

export { InputField, TextareaField };

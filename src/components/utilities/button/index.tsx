import type { TButtonProps } from "./type";

import clsx from "clsx";

import { cancelBtnClasses, buttonClasses, primaryBtnClasses } from "./styled";

const PrimaryButton = (props: TButtonProps) => {
  const { children, classes, className, ...buttonProps } = props;
  return (
    <button
      {...buttonProps}
      className={clsx(
        classes ? classes : buttonClasses,
        primaryBtnClasses,
        className,
      )}
    >
      {children}
    </button>
  );
};

const CancelButton = (props: TButtonProps) => {
  const { children, className, classes, ...buttonProps } = props;
  return (
    <button
      {...buttonProps}
      className={clsx(
        classes ? classes : buttonClasses,
        cancelBtnClasses,
        className,
      )}
    >
      {children}
    </button>
  );
};

export { PrimaryButton, CancelButton };

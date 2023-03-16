import clsx from "clsx";

export const Loader = ({ dimensions }: { dimensions: string }) => (
  <div
    className={clsx(
      dimensions,
      "animate-spin rounded-full border border-l-4 border-l-btn-light-pry dark:border-l-btn-dark-pry",
    )}
  />
);

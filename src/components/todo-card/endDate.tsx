import clsx from "clsx";
import { checkIsOutdated, relativeTime } from "~/helper";

export default function EndDate({ endDate }: { endDate: string | undefined }) {
  const isOutdated = checkIsOutdated(endDate);

  return (
    <label
      className={clsx(
        "text-sm cursor-pointer",
        isOutdated ? "text-alert-danger" : "text-neutral-700",
      )}
    >
      {relativeTime(endDate)}
    </label>
  );
}

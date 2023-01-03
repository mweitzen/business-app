import { WithChildren } from "@/types";
import { classNames } from "@/lib/common/classNames";

const CardBase: React.FC<WithChildren & { className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={classNames(
        "rounded-2xl bg-element px-4 py-6 shadow sm:p-8",
        className
      )}
    >
      {children}
    </div>
  );
};

export default CardBase;

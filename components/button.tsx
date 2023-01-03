import { WithChildren } from "@/types";
import { classNames } from "@/lib/common/classNames";

const ButtonBase: React.FC<
  WithChildren & React.HTMLProps<HTMLButtonElement>
> = ({ children, className = "", type = "button", ...props }) => {
  return (
    <button
      {...props}
      type={type as any}
      className={classNames(
        "rounded-full bg-element py-2 px-8 text-sm shadow shadow-purple-300 dark:shadow-gray-800",
        className
      )}
    >
      {children}
    </button>
  );
};

export default ButtonBase;

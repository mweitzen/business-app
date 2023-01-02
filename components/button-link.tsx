import Link, { LinkProps } from "next/link";
//
import { classNames } from "@/lib/helpers";
import { WithChildren } from "@/types";

const LinkButton: React.FC<WithChildren & LinkProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Link
      {...props}
      className={classNames(
        "rounded-full bg-element py-2 px-8 text-sm shadow shadow-purple-300 dark:shadow-gray-800",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default LinkButton;

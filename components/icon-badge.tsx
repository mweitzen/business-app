import { WithChildren } from "@/types";

const IconBadge: React.FC<WithChildren> = ({ children }) => {
  return (
    <div className="grid h-10 w-10 place-content-center rounded-full bg-purple-200">
      {children}
    </div>
  );
};

export default IconBadge;

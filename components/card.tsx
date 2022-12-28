import { WithChildren } from "@/types";

const CardBase: React.FC<WithChildren> = ({ children }) => {
  return (
    <div className="my-4 rounded-2xl bg-element px-4 py-6 shadow sm:p-8">
      {children}
    </div>
  );
};

export default CardBase;

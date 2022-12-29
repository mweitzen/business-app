import { WithChildren } from "@/types";

const LabelText: React.FC<WithChildren> = ({ children }) => {
  return (
    <span className="text-xs font-semibold uppercase tracking-widest text-muted">
      {children}
    </span>
  );
};

export default LabelText;

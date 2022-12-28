import { WithChildren } from "@/types";
import { FieldMetaProps } from "formik";
//
import InputErrorMessage from "./input-error-message";
import InputLabel from "./input-label";

/*
 *
 * INPUT BASE
 *
 */
interface IInputBase extends WithChildren {
  label: string;
  name: string;
  meta: FieldMetaProps<any>;
}

/*
 *
 * INPUT BASE
 *
 */
const InputBase: React.FC<IInputBase> = ({ children, label, name, meta }) => {
  return (
    <div className="grid gap-y-1">
      <div className="flex">
        <InputLabel htmlFor={name} label={label} />
        <InputErrorMessage meta={meta} />
      </div>
      {children}
    </div>
  );
};

export default InputBase;

import { FieldMetaProps } from "formik";
//
import InputErrorMessage from "./input-error-message";
import InputLabel from "./input-label";

/*
 *
 * INPUT BASE
 *
 */
export interface IInputBase extends React.HTMLProps<HTMLInputElement> {
  label: string;
  meta: FieldMetaProps<any>;
}

/*
 *
 * INPUT BASE
 *
 */
const InputBase: React.FC<IInputBase> = ({
  children,
  label,
  name = "default",
  meta,
}) => {
  return (
    <div className="grid gap-y-1 text-xs sm:text-sm">
      <div className="flex">
        <InputLabel htmlFor={name} label={label} />
        <InputErrorMessage meta={meta} />
      </div>
      {children}
    </div>
  );
};

export default InputBase;

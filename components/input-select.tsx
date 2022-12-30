import { WithChildren } from "@/types";
import { useField } from "formik";
//
import InputBase from "./input-base";

/*
 *
 *
 *
 */
export interface ISelectInput extends React.HTMLProps<HTMLSelectElement> {
  label: string;
}

/*
 *
 *
 *
 */
const SelectInput: React.FC<ISelectInput> = ({
  placeholder = "Select from dropdown",
  label,
  name,
  children,
}) => {
  if (!name) throw new Error("Must provide a name for the input");

  const [field, meta] = useField({
    name,
  });

  return (
    <InputBase label={label} name={name} meta={meta}>
      <select
        {...field}
        className="rounded-md border border-neutral-100 bg-default p-2 disabled:text-muted"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {children}
      </select>
    </InputBase>
  );
};

export default SelectInput;

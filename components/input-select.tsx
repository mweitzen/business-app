import { WithChildren } from "@/types";
import { useField } from "formik";
//
import InputBase from "./input-base";

/*
 *
 *
 *
 */
export interface ISelectInput extends WithChildren {
  label: string;
  name: string;
  defaultOption?: string;
}

/*
 *
 *
 *
 */
const SelectInput: React.FC<ISelectInput> = ({
  defaultOption = "Select from dropdown",
  label,
  name,
  children,
}) => {
  const [field, meta] = useField({
    name,
  });

  return (
    <InputBase label={label} name={name} meta={meta}>
      <select
        {...field}
        className="rounded-md border border-neutral-100 bg-default p-2"
      >
        <option value="">{defaultOption}</option>
        {children}
      </select>
    </InputBase>
  );
};

export default SelectInput;

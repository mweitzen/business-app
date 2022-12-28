import { WithChildren } from "@/types";
import { useField } from "formik";
import InputErrorMessage from "./input-error-message";

export interface ISelectInput extends WithChildren {
  label: string;
  name: string;
  defaultOption?: string;
}

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
    <div className="grid gap-y-1">
      <label htmlFor={name}>{label}</label>
      <select
        {...field}
        className="rounded-md border border-neutral-100 bg-default p-2"
      >
        <option value="">{defaultOption}</option>
        {children}
      </select>
      <InputErrorMessage meta={meta} />
    </div>
  );
};

export default SelectInput;

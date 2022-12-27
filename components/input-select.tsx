import { WithChildren } from "@/types";
import { useField } from "formik";

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
    <>
      <label htmlFor={name}>{label}</label>
      <select
        {...field}
        className="rounded-md border border-neutral-100 bg-default p-2"
      >
        <option value="">{defaultOption}</option>
        {children}
      </select>
      {meta.touched && meta.error ? (
        <span className="text-xs text-red-500">* {meta.error}</span>
      ) : null}
    </>
  );
};

export default SelectInput;

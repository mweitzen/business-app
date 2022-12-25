import { Field, ErrorMessage } from "formik";
import { WithChildren } from "@/types";

export interface ISelectInput extends WithChildren {
  label: string;
  name: string;
}

const SelectInput: React.FC<ISelectInput> = ({ label, name, children }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field name={name} as="select" className="bg-element">
        {children}
      </Field>
      <ErrorMessage name={name} />
    </>
  );
};

export default SelectInput;

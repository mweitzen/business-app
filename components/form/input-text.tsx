import { Field, ErrorMessage } from "formik";

export interface ITextInput {
  label: string;
  name: string;
  placeholder?: string;
}

const TextInput: React.FC<ITextInput> = ({
  label,
  name,
  placeholder = "Enter text",
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field name={name} placeholder={placeholder} className="bg-element" />
      <ErrorMessage name={name} />
    </>
  );
};

export default TextInput;

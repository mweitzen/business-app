import { Field, ErrorMessage } from "formik";
import { ITextInput } from "./input-text";

interface ITextAreaInput extends ITextInput {}

const TextAreaInput: React.FC<ITextAreaInput> = ({
  label,
  name,
  placeholder = "Enter text",
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field
        name={name}
        as="textarea"
        placeholder={placeholder}
        rows={3}
        className="bg-element"
      />
      <ErrorMessage name={name} />
    </>
  );
};

export default TextAreaInput;

import { Field, ErrorMessage, useField } from "formik";
import { classNames } from "@/lib/helpers";
import { ITextInput } from "./input-text";

interface ITextAreaInput extends ITextInput {}

const TextAreaInput: React.FC<ITextAreaInput> = ({
  label,
  name,
  placeholder = "Enter text",
  className = "",
}) => {
  const [field, meta] = useField({
    name,
  });

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <textarea
        {...field}
        rows={3}
        placeholder={placeholder}
        className={classNames(
          `rounded-md border border-neutral-100 bg-default p-2`,
          className
        )}
      />
      {meta.touched && meta.error ? (
        <span className="text-xs text-red-500">* {meta.error}</span>
      ) : null}
    </>
  );
};

export default TextAreaInput;

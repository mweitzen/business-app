import { classNames } from "@/lib/helpers";
import { Field, ErrorMessage, useField } from "formik";

export interface ITextInput {
  label: string;
  name: string;
  placeholder?: string;
  className?: string;
}

const TextInput: React.FC<ITextInput> = ({
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
      <input
        {...field}
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

export default TextInput;

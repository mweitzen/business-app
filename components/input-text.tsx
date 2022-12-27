import { classNames } from "@/lib/helpers";
import { Field, ErrorMessage, useField } from "formik";
import InputErrorText from "./input-error-text";

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
    <div className="grid gap-y-1">
      <label htmlFor={name}>{label}</label>
      <input
        {...field}
        placeholder={placeholder}
        className={classNames(
          `rounded-md border border-neutral-100 bg-default p-2`,
          className
        )}
      />
      <InputErrorText meta={meta} />
    </div>
  );
};

export default TextInput;

import { Field, ErrorMessage, useField } from "formik";
import { classNames } from "@/lib/helpers";
import { ITextInput } from "./input-text";
import InputErrorText from "./input-error-text";

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
    <div className="grid gap-y-1">
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
      <InputErrorText meta={meta} />
    </div>
  );
};

export default TextAreaInput;

import { useField } from "formik";
import { classNames } from "@/lib/helpers";
import { ITextInput } from "./input-text";
//
import InputBase from "./input-base";

/*
 *
 *
 *
 */
interface ITextAreaInput extends ITextInput {}

/*
 *
 *
 *
 */
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
    <InputBase label={label} name={name} meta={meta}>
      <textarea
        {...field}
        rows={3}
        placeholder={placeholder}
        className={classNames(
          `rounded-lg border border-neutral-100 bg-default p-2`,
          className
        )}
      />
    </InputBase>
  );
};

export default TextAreaInput;

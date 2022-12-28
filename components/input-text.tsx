import { classNames } from "@/lib/helpers";
import { useField } from "formik";
//
import InputBase from "./input-base";

/*
 *
 *
 *
 */
export interface ITextInput {
  label: string;
  name: string;
  placeholder?: string;
  className?: string;
}

/*
 *
 *
 *
 */
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
    <InputBase label={label} name={name} meta={meta}>
      <input
        {...field}
        placeholder={placeholder}
        className={classNames(
          `rounded-md border border-neutral-100 bg-default p-2`,
          className
        )}
      />
    </InputBase>
  );
};

export default TextInput;

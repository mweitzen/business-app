import { useField } from "formik";
import InputBase from "./input-base";

interface IPriceInput extends React.HTMLProps<HTMLInputElement> {
  label: string;
}

const PriceInput: React.FC<IPriceInput> = ({ label, name, ...props }) => {
  const [field, meta] = useField(name as string);

  return (
    <InputBase label={label} meta={meta}>
      <div className="flex rounded-md">
        <span className="inline-flex items-center rounded-l-md border border-r-0 border-neutral-100 bg-element px-3 text-sm text-gray-500">
          $
        </span>
        <input
          {...field}
          type="number"
          className="w-full flex-1 rounded-none rounded-r-md border border-neutral-100 bg-default p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
          {...props}
        />
      </div>
    </InputBase>
  );
};

export default PriceInput;

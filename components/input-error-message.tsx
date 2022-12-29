import { FieldMetaProps } from "formik";

const InputErrorMessage = ({ meta }: { meta: FieldMetaProps<any> }) => {
  return meta.touched && meta.error ? (
    <span className="ml-2 mt-[1px] flex items-center text-xs font-medium text-purple-600">
      * {meta.error}
    </span>
  ) : null;
};

export default InputErrorMessage;

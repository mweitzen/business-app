import { FieldMetaProps } from "formik";

const InputErrorText = ({ meta }: { meta: FieldMetaProps<any> }) => {
  return meta.touched && meta.error ? (
    <span className="text-xs leading-3 text-red-500">* {meta.error}</span>
  ) : (
    <span className="h-3" />
  );
};

export default InputErrorText;

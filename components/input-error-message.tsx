import { FieldMetaProps } from "formik";

const InputErrorMessage = ({ meta }: { meta: FieldMetaProps<any> }) => {
  return meta.touched && meta.error ? (
    <span className="text-xs leading-3 text-purple-600">* {meta.error}</span>
  ) : (
    <span className="h-3" />
  );
};

export default InputErrorMessage;

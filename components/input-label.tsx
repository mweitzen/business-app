import LabelText from "./text-label";

const InputLabel = ({ label, htmlFor }: { label: string; htmlFor: string }) => {
  return (
    <label htmlFor={htmlFor}>
      <LabelText>{label}</LabelText>
    </label>
  );
};

export default InputLabel;

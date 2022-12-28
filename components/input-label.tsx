const InputLabel = ({ label, htmlFor }: { label: string; htmlFor: string }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-xs font-semibold uppercase tracking-widest text-muted"
    >
      {label}
    </label>
  );
};

export default InputLabel;

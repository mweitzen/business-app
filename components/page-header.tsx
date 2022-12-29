import React from "react";

const PageHeader: React.FC<{ header: string; children?: React.ReactNode }> = ({
  children,
  header,
}) => {
  return (
    <header className="flex items-center justify-between py-4">
      <h1 className="text-2xl font-thin sm:text-4xl">{header}</h1>
      {children}
    </header>
  );
};

export default PageHeader;

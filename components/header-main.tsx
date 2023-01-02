import React from "react";

const MainHeader: React.FC<{ header: string }> = ({ header }) => {
  return (
    <header className="py-8 text-center sm:py-16">
      <h1 className="text-3xl font-thin sm:text-5xl">{header}</h1>
    </header>
  );
};

export default MainHeader;

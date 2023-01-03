import React from "react";
import BreadcrumbsHeader from "./header-breadcrumbs";

const PageHeader: React.FC<{ header: string; children?: React.ReactNode }> = ({
  children,
  header,
}) => {
  return (
    <div className="py-6 sm:py-8">
      <BreadcrumbsHeader />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-thin sm:text-4xl">{header}</h1>
        {children}
      </header>
    </div>
  );
};

export default PageHeader;

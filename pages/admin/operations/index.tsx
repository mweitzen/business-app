import PageHeader from "@/components/header-page";
import LabelText from "@/components/text-label";
import React from "react";

const DailyOperationsHomePage = () => {
  return (
    <div>
      <PageHeader header="Daily Operations. Business Logic" />
      <LabelText>Program Management</LabelText>
      <div className="mb-2 grid grid-cols-2 gap-4"></div>
      <LabelText>Occurrence Management</LabelText>
      <div className="mb-2 grid grid-cols-2 gap-4"></div>
      <LabelText>Employee Staffing</LabelText>
      <div className="mb-2 grid grid-cols-2 gap-4"></div>
      <LabelText>Location Management</LabelText>
      <div className="mb-2 grid grid-cols-2 gap-4"></div>
    </div>
  );
};

export default DailyOperationsHomePage;

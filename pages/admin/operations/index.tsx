import ButtonBase from "@/components/button";
import LinkButton from "@/components/button-link";
import CardBase from "@/components/card";
import PageHeader from "@/components/header-page";
import LabelText from "@/components/text-label";
import React from "react";

const DailyOperationsHomePage = () => {
  return (
    <div>
      <PageHeader header="Daily Operations. Business Logic" />

      <div className="space-y-4">
        <CardBase>
          <LabelText>Calendars</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4">
            <ButtonBase>View All</ButtonBase>
            <ButtonBase>Create Calendar</ButtonBase>
          </div>
        </CardBase>

        <CardBase>
          <LabelText>Program Management</LabelText>
          <div className="mb-2 grid grid-cols-2 gap-4">
            <ButtonBase>View All</ButtonBase>
            <ButtonBase>Create Program</ButtonBase>
          </div>
        </CardBase>

        <CardBase>
          <LabelText>Occurrence Management</LabelText>
        </CardBase>

        <CardBase>
          <LabelText>Employee Staffing</LabelText>
        </CardBase>

        <CardBase>
          <LabelText>Equipment Management</LabelText>
        </CardBase>

        <CardBase>
          <LabelText>Task Manager</LabelText>
        </CardBase>

        <CardBase>
          <LabelText>Location Management</LabelText>
        </CardBase>
      </div>
    </div>
  );
};

export default DailyOperationsHomePage;

import LinkButton from "@/components/button-link";
import React from "react";

const UnauthorizedPage = () => {
  return (
    <div className="py-4 text-center">
      <p>
        Sorry, you are unauthorized to view the page you were trying to access.
      </p>
      <LinkButton href="/">Go Home</LinkButton>
    </div>
  );
};

export default UnauthorizedPage;

import { useBreadcrumbs } from "@/lib/hooks";
import Link from "next/link";
import { Fragment } from "react";

const BreadcrumbsHeader = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="flex gap-4 py-2 text-xs font-semibold capitalize text-muted">
      {breadcrumbs.map(({ href, segment }, i) => {
        return (
          <Fragment key={i}>
            <Link href={href}>{segment}</Link>
            <span className="last:hidden">{`>`}</span>
          </Fragment>
        );
      })}
    </div>
  );
};

export default BreadcrumbsHeader;

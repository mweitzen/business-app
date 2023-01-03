import Link from "next/link";
import { Fragment } from "react";
import { useRouter } from "next/router";

const BreadcrumbsHeader = () => {
  const { asPath } = useRouter();
  const paths = asPath.slice(1).split("/");

  return (
    <div className="flex gap-4 py-2 text-xs font-semibold capitalize text-muted">
      {paths.map((path, i, arr) => {
        let href = `/${arr.slice(0, i + 1).join("/")}`;
        return (
          <Fragment key={i}>
            <Link href={href}>{path}</Link>
            <span className="last:hidden">{`>`}</span>
          </Fragment>
        );
      })}
    </div>
  );
};

export default BreadcrumbsHeader;

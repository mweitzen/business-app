import { usePathname } from "./usePathname";

export const useBreadcrumbs = () => {
  const _pathname = usePathname();
  const pathname = _pathname.slice(1);

  const paths = pathname.split("/");

  const breadcrumbs = paths.map((path, i, paths) => {
    const sliceUpUntil = i + 1;
    const breadcrumbSegment = paths.slice(0, sliceUpUntil).join("/");

    return {
      href: `/${breadcrumbSegment}`,
      segment: path,
    };
  });

  return breadcrumbs;
};

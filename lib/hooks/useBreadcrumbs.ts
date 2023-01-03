import { usePathname } from "./usePathname";

export const useBreadcrumbs = () => {
  const pathname = usePathname();

  const paths = pathname.split("/");

  const breadcrumbs = paths.map((path, i, paths) => {
    const sliceUpUntil = i + 1;
    const breadcrumbSegment = paths.slice(0, sliceUpUntil).join("/");

    return {
      href: breadcrumbSegment || "/",
      segment: path || "Home",
    };
  });

  return breadcrumbs;
};

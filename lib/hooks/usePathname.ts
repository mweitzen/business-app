import { useRouter } from "next/router";

export const usePathname = () => {
  const { asPath } = useRouter();
  return asPath;
};

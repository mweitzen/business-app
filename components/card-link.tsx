import Link from "next/link";
//
import CardBase from "./card";
import LabelText from "./text-label";

const LinkCard: React.FC<{ href: string; label: string }> = ({
  href,
  label,
}) => {
  return (
    <Link href={href}>
      <CardBase>
        <LabelText>{label}</LabelText>
      </CardBase>
    </Link>
  );
};

export default LinkCard;

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
//
import PageHeader from "@/components/page-header";
import LabelText from "@/components/text-label";
import Link from "next/link";

const UserAssetsPage = () => {
  const {
    query: { id: userId },
  } = useRouter();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", userId, "assets"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/users/${userId}/assets`);
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <PageHeader header={`${user.name}'s Assets`} />
      <div>
        <div className="grid gap-y-4">
          {user ? (
            user.assets.map((asset) => (
              <AssetListItem key={asset.id} asset={asset} />
            ))
          ) : (
            <div>No assets i think</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAssetsPage;

const AssetListItem = ({ asset }: any) => {
  return (
    <Link href={`/assets/${asset.id}`}>
      <div className="rounded-xl bg-element py-2 px-3 shadow sm:p-4">
        <LabelText>{asset.name}</LabelText>
        <div>
          <p>
            <span>{asset.brand}</span> · <span>{asset.type}</span>
          </p>
          <p className="text-sm">{asset.serialNumber}</p>
        </div>
      </div>
    </Link>
  );
};

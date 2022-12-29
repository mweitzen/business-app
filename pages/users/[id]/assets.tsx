import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
//
import PageHeader from "@/components/page-header";

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
      <PageHeader header="User Assets Page" />
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
    <div className="rounded-xl bg-element p-2 shadow sm:p-4">{asset.name}</div>
  );
};

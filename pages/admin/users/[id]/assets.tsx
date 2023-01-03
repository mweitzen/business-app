import Link from "next/link";
//
import { useRouter } from "next/router";
import { Asset } from "@prisma/client";
//
import PageHeader from "@/components/header-page";
import LabelText from "@/components/text-label";
import { api } from "@/lib/api";

const UserAssetsPage = () => {
  const {
    query: { id: userId },
  } = useRouter();

  const { data: user, isLoading } = api.user.getUsersAssets.useQuery({
    userId: (userId as string) || "",
  });

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <div>Uh Oh Couldn't find</div>;

  return (
    <div>
      <PageHeader header={`${user.name}'s Assets`} />

      <div>
        <div className="grid gap-y-4">
          {user ? (
            user.assets.map((asset: Asset) => (
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

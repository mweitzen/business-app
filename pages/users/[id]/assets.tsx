const UserAssetsPage = () => {
  return (
    <div>
      <header className="flex items-center justify-between py-4">
        <h1 className="text-4xl font-thin">User Assets Page</h1>
      </header>
      <div>
        <div className="grid gap-y-4">
          {[1, 2, 3].map((asset) => (
            <AssetListItem key={asset} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserAssetsPage;

const AssetListItem = () => {
  return (
    <div className="rounded-xl bg-element p-2 shadow sm:p-4">
      asset list item
    </div>
  );
};

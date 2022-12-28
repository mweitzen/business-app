const UserAssetsPage = () => {
  return (
    <div>
      <header className="flex items-center justify-between py-4">
        <h1 className="text-4xl font-thin">User Assets Page</h1>
      </header>
      <div>
        <h2>User Assets</h2>
        {[1, 2, 3].map((asset) => (
          <div key={asset}>Asset List Item</div>
        ))}
      </div>
    </div>
  );
};

export default UserAssetsPage;

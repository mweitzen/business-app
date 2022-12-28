import SelectFilter from "@/components/select-filter";

const Demo = () => {
  return (
    <div>
      <div className="flex">
        <SelectFilter
          filterOptions={[
            { id: "type", name: "Type" },
            { id: "brand", name: "Brand" },
            { id: "status", name: "Status" },
          ]}
        />
        <SelectFilter
          filterOptions={[
            { id: "type", name: "Type" },
            { id: "brand", name: "Brand" },
            { id: "status", name: "Status" },
          ]}
        />
        <SelectFilter
          filterOptions={[
            { id: "type", name: "Type" },
            { id: "brand", name: "Brand" },
            { id: "status", name: "Status" },
          ]}
        />
      </div>
      <p>Stuff Underneath</p>
    </div>
  );
};

export default Demo;

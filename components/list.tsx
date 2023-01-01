import { WithChildren } from "@/types";
import FilterSelect, { IFilterSelect } from "./select-filter";

interface IListBase extends WithChildren {
  search: React.HTMLProps<HTMLInputElement>;
  filters: IFilterSelect[];
}

const ListBase: React.FC<IListBase> = ({ search, filters, children }) => {
  return (
    <div>
      {/*  */}
      <div className="mb-6 space-y-3">
        {/* search bar */}
        <input
          type="search"
          className="w-full rounded-full border border-neutral-200 bg-element py-2 pl-3 pr-10 focus:border-transparent focus:ring-purple-300"
          {...search}
        />

        {/* filters */}
        <div className="flex gap-x-2">
          {filters.map((option, i) => (
            <FilterSelect key={i} {...option} />
          ))}
        </div>
      </div>

      {/*  */}
      {children}
    </div>
  );
};

export default ListBase;

import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

type FilterOptions = { id: string; name: string }[];

const SelectFilter = ({ filterOptions }: { filterOptions: FilterOptions }) => {
  const [selectedPeople, setSelectedPeople] = useState([
    filterOptions[0],
    filterOptions[1],
  ]);

  return (
    <div className="relative">
      <Listbox value={selectedPeople} onChange={setSelectedPeople} multiple>
        <Listbox.Button className="relative w-full cursor-pointer rounded-full bg-element py-2 pl-3 pr-10 text-left shadow-md shadow-purple-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-300 sm:text-sm">
          <span className="block truncate">
            {selectedPeople.map((option) => option.name).join(", ")}
            {selectedPeople.length === 0 ? (
              <span className="text-gray-600">Filter</span>
            ) : null}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            O
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filterOptions.map((option) => (
              <Listbox.Option
                key={option.id}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? "bg-purple-100 text-purple-900" : ""
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                        X
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};
export default SelectFilter;

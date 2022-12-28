import { Combobox, Transition } from "@headlessui/react";
import useUsers from "hooks/useUsers";
import { Fragment, useState } from "react";

// type SelectUserProps = {
//   user: any;
//   setUser: (val: any) => void;
// };
const defaultOption = { id: 0, name: "Select a user or begin typing" };
const emptyOption = { id: -1, name: "" };

const SelectUser = () => {
  const [selected, setSelected] = useState<typeof defaultOption>(defaultOption);
  const [query, setQuery] = useState("");

  const { data: users, isFetching } = useUsers();

  if (isFetching) return <div>Loading...</div>;

  const filteredOptions =
    query === ""
      ? users
      : users.filter((user: any) =>
          user.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="w-full text-left">
      <Combobox
        value={selected}
        onChange={setSelected}
        onFocus={() => {
          if (defaultOption) {
            setSelected(emptyOption);
          }
        }}
        onBlur={() => {
          if (selected === emptyOption) {
            setSelected(defaultOption);
          }
        }}
      >
        <div className="relative">
          <div className="relative w-full cursor-pointer overflow-hidden rounded-full bg-element text-left shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-300 sm:text-sm">
            <Combobox.Input
              className="w-full rounded-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(option) => selected.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              ---
            </Combobox.Button>
          </div>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="ring-purple absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-element py-1 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOptions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  No users found.
                </div>
              ) : (
                filteredOptions.map((user) => (
                  <Combobox.Option
                    key={user.id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? "bg-purple-600 text-white" : ""
                      }`
                    }
                    value={user}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {user.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-purple-600"
                            }`}
                          >
                            X
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SelectUser;

import { Fragment } from "react";
import { classNames } from "@/lib/common/classNames";
import { Listbox, Transition } from "@headlessui/react";
import { OptionProps } from "@/types";

export interface IFilterSelect {
  label: string;
  options: OptionProps[];
  value: OptionProps[];
  setValue: any;
}

const FilterSelect: React.FC<IFilterSelect> = ({
  label,
  options,
  value,
  setValue,
}) => {
  return (
    <div className="relative z-10 w-full">
      <Listbox
        value={value}
        onChange={setValue}
        disabled={options.length === 0}
        multiple
      >
        <Listbox.Button
          className={classNames(
            `w-full truncate rounded-full border px-8 py-2 text-center text-xs capitalize shadow shadow-purple-300 disabled:bg-gray-50 disabled:shadow-gray-200 dark:shadow-gray-800 sm:text-start`,
            value.length !== 0 ? "font-medium" : ""
          )}
        >
          {value.length === 0
            ? label
            : value.join(" | ").toLowerCase().replace("_", " ")}
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition transform duration-400 ease-in"
          enterFrom="opacity-0 scale-[75%] -translate-y-12"
          enterTo="opacity-100 scale-100 translate-y-0"
          leave="transition transform duration-300 ease-out"
          leaveFrom="opacity-100 scale-100 translate-y-0"
          leaveTo="opacity-0 scale-[75%] -translate-y-12"
        >
          <Listbox.Options className="absolute mt-1 w-full rounded-2xl bg-default py-4 text-sm shadow shadow-purple-300 dark:shadow-gray-800">
            {options.map(({ value, label }) => (
              <Listbox.Option
                key={value}
                value={value}
                className={({ active }) =>
                  classNames(
                    "relative py-2 pl-8 pr-4 hover:cursor-pointer",
                    active ? "bg-purple-100 text-purple-900" : ""
                  )
                }
              >
                {({ selected }) => (
                  <div className="flex items-center gap-2">
                    <span className="grid h-4 w-4 place-content-center font-bold text-purple-900">
                      {selected ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-full w-full"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : null}
                    </span>
                    <span
                      className={classNames(
                        "truncate capitalize",
                        selected ? "font-medium" : ""
                      )}
                    >
                      {label}
                    </span>
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};

export default FilterSelect;

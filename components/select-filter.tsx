import { Fragment } from "react";
import { classNames } from "@/lib/helpers";
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
      <Listbox value={value} onChange={setValue} multiple>
        <Listbox.Button
          className={classNames(
            `w-full truncate rounded-full border px-8 py-2 text-center text-xs capitalize shadow shadow-purple-300 sm:text-start`,
            value.length !== 0 ? "font-medium" : ""
          )}
        >
          {value.length === 0 ? label : value.join(" | ").toLowerCase()}
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
          <Listbox.Options className="absolute mt-1 w-full rounded-2xl bg-default py-4 text-sm shadow shadow-purple-300">
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
                  <>
                    <span
                      className={classNames(
                        "truncate",
                        selected ? "font-medium" : ""
                      )}
                    >
                      {label}
                    </span>
                    {selected ? (
                      <span className="absolute left-0 ml-4 font-bold text-purple-900">
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

export default FilterSelect;

import Link from "next/link";
//
import { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
//
import { useDisplayContext } from "@/context/display";
//
import LabelText from "@/components/text-label";

const MobileSidebar = () => {
  const { displaySidebar, setDisplaySidebar } = useDisplayContext();

  return (
    <Transition show={displaySidebar} as={Fragment}>
      <Dialog
        as="div"
        className="absolute inset-0 z-10"
        onClose={setDisplaySidebar}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-500 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 bg-black bg-opacity-30" />
        </Transition.Child>
        <div className="relative h-full">
          <Transition.Child
            as={Fragment}
            enter="transition-transform transform duration-500  ease-out"
            enterFrom="-translate-x-full"
            enterTo="-translate-x-0"
            leave="transition-transform transform duration-300  ease-in"
            leaveFrom="-translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="h-full w-72 bg-element p-4">
              <div className="h-12 sm:h-14" />
              <div className="border-b py-2">
                <Link onClick={() => setDisplaySidebar(false)} href="/admin">
                  <LabelText>Admin</LabelText>
                </Link>
                <nav>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        onClick={() => setDisplaySidebar(false)}
                        href="/admin/IT"
                      >
                        IT
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => setDisplaySidebar(false)}
                        href="/admin/HR"
                      >
                        HR
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => setDisplaySidebar(false)}
                        href="/admin/finance"
                      >
                        Finance
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => setDisplaySidebar(false)}
                        href="/admin/facilities"
                      >
                        Facilities
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => setDisplaySidebar(false)}
                        href="/admin/employees"
                      >
                        Employees
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="border-b py-2">
                <Link onClick={() => setDisplaySidebar(false)} href="/personal">
                  <LabelText>Personal</LabelText>
                </Link>
                <nav>
                  <ul className="space-y-2"></ul>
                </nav>
              </div>
              <div className="border-b py-2">
                <Link onClick={() => setDisplaySidebar(false)} href="/public">
                  <LabelText>Public</LabelText>
                </Link>
                <nav>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        onClick={() => setDisplaySidebar(false)}
                        href="/public/jobs"
                      >
                        Job Postings
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MobileSidebar;

import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { WithChildren } from "@/types";

type ModalProps = WithChildren & {
  show: boolean;
  handleClose: (val: boolean) => void;
};

const ModalBase = ({ show, handleClose, children }: ModalProps) => {
  return (
    <Transition show={show} as={Fragment}>
      <Dialog as="div" onClose={handleClose}>
        <Transition.Child as={Fragment}>
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>
        <div className="fixed inset-0 flex items-center justify-center">
          <Transition.Child as={Fragment}>
            <Dialog.Panel className="mx-4 w-full max-w-md rounded-2xl bg-element p-8 shadow-sm shadow-purple-800 dark:shadow-gray-800">
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalBase;

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
        <Transition.Child>
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>
        <div className="fixed inset-0 grid place-content-center">
          <Transition.Child>
            <Dialog.Panel className="rounded-lg bg-element p-8 shadow-lg">
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalBase;

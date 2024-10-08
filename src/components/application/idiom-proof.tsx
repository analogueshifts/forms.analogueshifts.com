"use client";
import { Fragment, useRef } from "react";
import { Transition, Dialog } from "@headlessui/react";

import Image from "next/image";
import Spinner from "@/assets/images/spinner.svg";

interface IdiomProps {
  title: string;
  description: string;
  open: boolean;
  close: () => void;
  action: () => void;
  buttonLabel: string;
  loading?: boolean;
}

const IdiomProof: React.FC<IdiomProps> = ({
  title,
  description,
  open,
  action,
  close,
  buttonLabel,
  loading,
}) => {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[3100]"
        initialFocus={cancelButtonRef}
        onClose={close}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-primary-boulder400">
                          {description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" px-4 pb-6 pt-4 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className={`inline-flex items-center gap-1.5 w-full justify-center rounded-xl  h-10  text-xs font-semibold text-primary-boulder50  sm:ml-3 sm:w-auto px-10 bg-background-darkYellow`}
                    onClick={action}
                  >
                    {loading ? (
                      <Image
                        src={Spinner}
                        alt=""
                        className="w-6 animate-spin"
                      />
                    ) : (
                      buttonLabel || title
                    )}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex border border-primary-boulder200/50 outline-none w-full items-center h-10 px-8 rounded-xl justify-center py-2 text-xs font-semibold text-primary-boulder400 sm:mt-0 sm:w-auto outline-transparent"
                    onClick={close}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default IdiomProof;

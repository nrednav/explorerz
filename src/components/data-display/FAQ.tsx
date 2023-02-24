import { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

type FAQProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const FAQ: FC<FAQProps> = ({ open, setOpen }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
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
              <Dialog.Panel className="notched-module relative transform overflow-hidden bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3 text-left sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      LORE
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you ready to embark on a thrilling journey into the
                        unknown? Let me introduce you to the Explorerz, a
                        mysterious and enigmatic secret society. These daring
                        adventurers have dedicated their lives to exploring new
                        lands beyond the boundaries of the known world. Their
                        origins are shrouded in mystery, stretching back through
                        endless generations. Some whisper that their ancient
                        lineage is steeped in mysticism and magic, giving them
                        the power to uncover hidden secrets and unlock ancient
                        mysteries. But the most intriguing rumor of all is that
                        an enormous event will occur once the Explorerz have
                        discovered all the lands. What could it be? No one knows
                        for sure, but one thing is certain: the Explorerz are
                        determined to find out. Join us on this exciting journey
                        as we delve deep into the unknown and unlock the secrets
                        of the Explorerz. Who knows what we will uncover? The
                        adventure awaits!
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 text-left sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      FAQ
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        How does this work? <br />
                        What will my NFT look like? <br />
                        How much does it cost?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex w-full justify-center sm:mt-6">
                  <button
                    type="button"
                    className="notched-module inline-flex w-32 items-center justify-center border border-transparent bg-slate-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    Back to map
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
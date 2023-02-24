import { FC, Fragment } from "react";
import Button from "../input-and-actions/Button";
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
              <Dialog.Panel className="notched-module relative transform overflow-hidden bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                <div>
                  <div className="mt-3 text-left sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      LORE
                    </Dialog.Title>
                    <div className="mt-2 flex flex-col space-y-4 text-sm text-gray-500">
                      <p>
                        Are you ready to embark on a thrilling journey into the
                        unknown? Join the Explorerz, a mysterious and enigmatic
                        secret society.
                      </p>
                      <p>
                        These daring adventurers have dedicated their lives to
                        exploring new lands beyond the boundaries of the known
                        world. Their origins are shrouded in mystery, stretching
                        back through endless generations. Some whisper that
                        their ancient lineage is steeped in mysticism and magic,
                        giving them the power to uncover hidden secrets and
                        unlock ancient mysteries.
                      </p>
                      <p>
                        But the most intriguing rumor of all is that an enormous
                        event will occur once the Explorerz have discovered all
                        the lands. What could it be? No one knows for sure, but
                        one thing is certain: the Explorerz are determined to
                        find out.
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
                    <div className="mt-2 flex flex-col space-y-4 text-sm text-gray-500">
                      <h4 className="font-semibold">How does this work?</h4>
                      <p>
                        Explorerz, an enigmatic on-chain experiment with no
                        roadmap and no discord. The lower the timer, the higher
                        the minting expedition phase and the greater the reward,
                        as Explorerz get to claim more land and place it on the
                        map. The countdown resets to the lowest phase each time
                        an explorer claims new land. The first part of the
                        journey ends when the map has been explored. New
                        Explorerz can only claim land every 5 minutes.
                      </p>
                      <h4 className="font-semibold">
                        What will my NFT look like?
                      </h4>
                      <p>
                        There are four types of land out there, each with four
                        mysterious variations waiting to be discovered by the
                        explorerz. The amount of land you can claim is not set
                        in stone. It all depends on the phase of your minting
                        expedition.
                      </p>
                      <h4 className="font-semibold">How much does it cost?</h4>
                      <p>
                        This drop uses a pay-what-you-want model. You can choose
                        to pay nothing, but all contributions are greatly
                        appreciated and will help us build more fun NFTs in the
                        future. Anyone who contributes will receive perks for
                        future drops.
                      </p>
                      <h4 className="font-semibold">Who created this?</h4>
                      <a
                        href="https://www.vandern.com/"
                        className="text-blue-700"
                      >
                        @nrednav
                      </a>
                      <a
                        href="https://twitter.com/CO_IN_TECH"
                        className="text-blue-700"
                      >
                        @CO_IN_TECH
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex w-full justify-center sm:mt-6">
                  <Button onClick={() => setOpen(false)}>Back</Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

import { FC, Fragment, useState } from "react";
import Image from "next/image";
import { FAQ } from "../data-display/FAQ";
import LoginButton from "../input-and-actions/LoginButton";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export const NavBar: FC = () => {
  const [openFAQ, setOpenFAQ] = useState(false);

  return (
    <>
      <FAQ open={openFAQ} setOpen={setOpenFAQ} />
      <Disclosure as="nav" className="opacity-80 shadow">
        {({ open }) => (
          <Fragment>
            <div className="font-crimson mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex w-full items-center justify-between">
                  <div className="flex w-full items-center">
                    <a
                      href="/"
                      className="text-primary inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm uppercase hover:opacity-100"
                    >
                      Explorerz
                    </a>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                      <button
                        key="FAQ"
                        className="text-primary inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm uppercase hover:opacity-100"
                        onClick={() => setOpenFAQ(!openFAQ)}
                      >
                        ?
                      </button>
                    </div>
                  </div>
                  <div className="hidden gap-x-6 sm:flex sm:items-center">
                    <a
                      href="/scores"
                      className="text-primary inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm uppercase hover:opacity-100"
                    >
                      <div className="relative mx-auto h-16 w-16 max-w-2xl object-cover sm:mx-0 sm:h-16 sm:w-16 sm:max-w-none">
                        <Image
                          src="/images/Reward.png"
                          alt="A mysterious reward"
                          fill
                        />
                      </div>
                    </a>
                    <div>
                      <LoginButton />
                    </div>
                  </div>
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="text-primary focus:ring-minimal-black inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon
                        className="text-primary block h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <Bars3Icon
                        className="text-primary block h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pt-2 pb-3">
                <Disclosure.Button
                  key="FAQMobile"
                  as="button"
                  className="border-minimal-black text-primary bg-minimal-white block border-l-4 py-2 px-4 text-sm font-medium sm:text-base"
                  onClick={() => setOpenFAQ(!openFAQ)}
                >
                  About
                </Disclosure.Button>
              </div>
              <div className="border-minimal-black bg-minimal-white flex w-full justify-start border-l-4 pl-3">
                <a href="/scores">
                  <div className="relative h-16 w-16 max-w-2xl object-cover">
                    <Image
                      src="/images/Reward.png"
                      alt="A mysterious reward"
                      fill
                    />
                  </div>
                </a>
              </div>
              <div className="flex w-full flex-col items-stretch justify-center p-4">
                <LoginButton />
              </div>
            </Disclosure.Panel>
          </Fragment>
        )}
      </Disclosure>
    </>
  );
};

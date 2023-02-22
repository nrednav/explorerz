import { FC, Fragment } from "react";
import LoginButton from "../input-and-actions/LoginButton";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = {
  main: [{ name: "About", href: "/about" }],
};

export const NavBar: FC = () => {
  return (
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
                    {navigation.main.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-primary inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm uppercase hover:opacity-100"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:block">
                  <LoginButton />
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
              {navigation.main.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="border-minimal-black text-primary bg-minimal-white block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="flex w-full justify-center py-4">
              <LoginButton />
            </div>
          </Disclosure.Panel>
        </Fragment>
      )}
    </Disclosure>
  );
};

import React from "react";
import Image from "next/image";

const RewardContent = () => {
  return (
    <div className="overflow-hidden bg-white pb-6 sm:py-8">
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
          <div className="px-2 lg:px-0 lg:pr-4">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                Greetings, brave explorerz!
              </h2>
              <p className="mt-6 text-xs text-gray-600 sm:text-sm sm:!leading-8">
                As you venture forth, mapping uncharted territories, you will be
                able to collect an amazing explorerz reward. But beware! The
                road ahead is treacherous, and not all expeditions are created
                equal.
              </p>
              <p className="mt-6 text-xs text-gray-600 sm:text-sm sm:!leading-8">
                The more tiles you lay, the more expeditions you complete, the
                rarer your explorerz reward will be. Will you be satisfied with
                a common reward, or will you brave the dangers of the unknown
                and unlock the rarest? Only you can decide your fate! So gather
                your courage, grab your compass, and let the adventure begin!
              </p>
            </div>
          </div>
          <div className="pixelated sm:px-6 lg:px-0">
            <div className="relative isolate overflow-hidden bg-indigo-600 sm:mx-auto sm:max-w-2xl lg:mx-0 lg:max-w-none">
              <div
                className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-indigo-200 opacity-20 ring-1 ring-inset ring-white"
                aria-hidden="true"
              />
              <div className="flex h-full w-full justify-center">
                <div className="relative mx-auto h-64 w-64 max-w-2xl object-cover sm:mx-0 sm:h-[450px] sm:w-[450px] sm:max-w-none">
                  <Image
                    src="/images/ExplorerzHero.png"
                    alt="Four mysterious explorerz"
                    fill
                  />
                </div>
              </div>

              <div
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardContent;

import React from "react";
import Error from "@/components/data-display/Error";
import Loading from "@/components/data-display/Loading";
import useExplorerz from "@/hooks/useExplorerz";
import useUser from "@/hooks/useUser";
import clsx from "clsx";

const LeaderBoard = () => {
  const { user } = useUser();
  const { data, isLoading, isError } = useExplorerz();

  if (isError) return <Error message="Could not load data..." />;
  if (isLoading) return <Loading />;
  if (!data) return <Error message="Could not load data..." />;

  const explorerz = Object.values(data);
  console.log("🚀 ~ LeaderBoard ~ explorerz:", explorerz);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-indigo-600">
            Leaderboard
          </h1>
          <p className="mt-6 text-sm text-gray-700">
            A list of all the explorerz in the world that went on amazing
            expeditions. Once the map is complete, explorerz rewards will be
            distributed like so:
          </p>
          <div className="flex w-full justify-center">
            <div className="mt-2 grid grid-cols-2 gap-8 text-sm text-gray-700">
              <p className="mt-2 text-indigo-600">
                Top 5%: Legendary explorerz
              </p>
              <p className="mt-2 text-blue-400">5%-10%: Epic explorerz</p>
              <p className="mt-2 text-red-400">10%-45%: Rare explorerz</p>
              <p className="mt-2">45%-100%: Common explorerz</p>
            </div>
          </div>
        </div>
      </div>
      <div className="pixelated mt-8 flow-root w-full bg-white text-black after:text-gray-100 hover:text-black focus:outline-none">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="w-full divide-y divide-black">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-0 sm:text-sm"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-xs font-semibold text-gray-900 sm:text-sm"
                  >
                    Tiles
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black">
                {explorerz.map((explorer) => (
                  <tr key={explorer.address}>
                    <td
                      className={clsx(
                        "whitespace-nowrap py-4 pl-4 pr-3 text-left text-xs font-medium sm:pl-0 sm:text-sm",
                        explorer.address === user.addr
                          ? "bg-yellow-400 text-indigo-600"
                          : "text-gray-600"
                      )}
                    >
                      {explorer.address}
                    </td>
                    <td
                      className={clsx(
                        "whitespace-nowrap px-3 py-4 text-left text-xs text-gray-500 sm:text-sm",
                        explorer.address === user.addr
                          ? "bg-yellow-400 text-indigo-600"
                          : "text-gray-600"
                      )}
                    >
                      {explorer.tilesPlaced}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;

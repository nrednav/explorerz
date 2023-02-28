import React from "react";

type Explorerz = {
  address: string;
  tilesPlaced: number;
};

const explorerz: Explorerz[] = [
  {
    address: "0xeb179c27144f783c",
    tilesPlaced: 5,
  },
  {
    address: "0xeb179c27144f783c",
    tilesPlaced: 3,
  },
  {
    address: "0xeb179c27144f783c",
    tilesPlaced: 2,
  },
  {
    address: "0xeb179c27144f783c",
    tilesPlaced: 1,
  },
  {
    address: "0xeb179c27144f783c",
    tilesPlaced: 1,
  },
];

const LeaderBoard = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Leaderboard
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the explorerz in the world that went on amazing
            expeditions.
          </p>
        </div>
      </div>
      <div className="pixelated mt-8 flow-root w-full">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Tiles
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {explorerz.map((explorer) => (
                  <tr key={explorer.address}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-0">
                      {explorer.address}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
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

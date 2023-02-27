import { FC } from "react";
import Loading from "./Loading";
import Error from "@/components/data-display/Error";
import useMintingPhase from "@/hooks/useMintingPhase";
import clsx from "clsx";

enum StepStatus {
  "previous",
  "current",
  "next",
}

type StepProps = {
  stepIdx: number;
  step: {
    id: string;
    description: string;
  };
  mintingPhase: number;
};

const steps = [
  {
    id: "I",
    description: "1x Tile",
  },
  {
    id: "II",
    description: "2x Tiles",
  },
  {
    id: "III",
    description: "3x Tiles",
  },
  {
    id: "IV",
    description: "4x Tiles",
  },
];

const getStepStatus = (stepIdx: number, currentPhase: number) => {
  if (stepIdx < currentPhase) return StepStatus.previous;
  if (stepIdx === currentPhase) return StepStatus.current;
  return StepStatus.next;
};

const Step: FC<StepProps> = ({ stepIdx, step, mintingPhase }) => {
  const stepStatus = getStepStatus(stepIdx, mintingPhase);
  return (
    <div
      className={clsx(
        stepStatus === StepStatus.current
          ? "bg-blue-400"
          : stepStatus === StepStatus.previous
          ? "bg-slate-500"
          : "bg-slate-400"
      )}
    >
      <span
        className={clsx(
          stepIdx !== 0 ? "lg:pl-9" : "",
          "flex justify-around px-6 py-5 text-sm font-medium text-white lg:flex-col lg:gap-y-2"
        )}
      >
        <span>{step.id}</span>
        <span>{step.description}</span>
      </span>
    </div>
  );
};

const MintingPhases = () => {
  const { data: mintingPhase, isLoading, isError } = useMintingPhase();

  if (isError) return <Error message="Could not load minting phase..." />;
  if (isLoading) return <Loading />;
  if (!mintingPhase) return <Error message="Could not load minting phase..." />;

  return (
    <div className="mx-auto max-w-[1024px] py-4 lg:py-8">
      <div className="py-4">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Minting phase:
          {/* {steps.filter((step) => step.status === StepStatus.current)[0].id} */}
        </h2>
      </div>
      <div className="pixelated w-full bg-slate-600 text-white after:text-slate-800 hover:text-white focus:outline-none">
        <nav aria-label="Minting phase">
          <ol role="list" className="overflow-hidden lg:flex">
            {steps.map((step, stepIdx) => (
              <li key={step.id} className="relative overflow-hidden lg:flex-1">
                <div
                  className={clsx(
                    stepIdx === 0 ? "border-b-0" : "",
                    stepIdx === steps.length - 1 ? "border-t-0" : "",
                    "overflow-hidden border border-slate-600 lg:border-0"
                  )}
                >
                  <Step
                    stepIdx={stepIdx}
                    step={step}
                    mintingPhase={mintingPhase.current}
                  />
                  {stepIdx !== 0 ? (
                    <>
                      {/* Separator */}
                      <div
                        className="absolute inset-0 top-0 left-0 hidden w-1 border border-slate-600 bg-slate-600 lg:block"
                        aria-hidden="true"
                      ></div>
                    </>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default MintingPhases;

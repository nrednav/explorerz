import { FC } from "react";
import clsx from "clsx";

enum StepStatus {
  "complete",
  "current",
  "upcoming",
}

type StepProps = {
  stepIdx: number;
  step: {
    id: string;
    description: string;
    status: StepStatus;
  };
};

const steps = [
  {
    id: "I",
    description: "1x Tile",
    status: StepStatus.complete,
  },
  {
    id: "II",
    description: "2x Tiles",
    status: StepStatus.current,
  },
  {
    id: "III",
    description: "3x Tiles",
    status: StepStatus.upcoming,
  },
  {
    id: "IV",
    description: "4x Tiles",
    status: StepStatus.upcoming,
  },
];

const CompleteStep: FC<StepProps> = ({ stepIdx, step }) => {
  return (
    <div>
      <span
        className="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
        aria-hidden="true"
      />
      <span
        className={clsx(
          stepIdx !== 0 ? "lg:pl-9" : "",
          "flex items-start px-6 py-5 text-sm font-medium"
        )}
      >
        <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
          <span className="text-sm font-medium">{step.id}</span>
          <span className="text-sm font-medium text-gray-500">
            {step.description}
          </span>
        </span>
      </span>
    </div>
  );
};

const CurrentStep: FC<StepProps> = ({ stepIdx, step }) => {
  return (
    <div>
      <span
        className="absolute top-0 left-0 h-full w-1 bg-blue-400 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
        aria-hidden="true"
      />
      <span
        className={clsx(
          stepIdx !== 0 ? "lg:pl-9" : "",
          "flex items-start px-6 py-5 text-sm font-medium"
        )}
      >
        <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
          <span className="text-sm font-medium text-blue-400">{step.id}</span>
          <span className="text-sm font-medium text-black">
            {step.description}
          </span>
        </span>
      </span>
    </div>
  );
};

const UpcomingStep: FC<StepProps> = ({ stepIdx, step }) => {
  return (
    <div>
      <span
        className="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
        aria-hidden="true"
      />
      <span
        className={clsx(
          stepIdx !== 0 ? "lg:pl-9" : "",
          "flex items-start px-6 py-5 text-sm font-medium"
        )}
      >
        <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
          <span className="text-sm font-medium text-gray-500">{step.id}</span>
          <span className="text-sm font-medium text-gray-500">
            {step.description}
          </span>
        </span>
      </span>
    </div>
  );
};

const MintingPhases = () => {
  return (
    <div className="mx-auto max-w-[1024px] py-4 lg:py-8">
      <div className="py-4">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Minting phases
        </h2>
      </div>
      <div className="lg:border-t lg:border-b lg:border-gray-200">
        <nav className="mx-auto max-w-7xl" aria-label="Progress">
          <ol
            role="list"
            className="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200"
          >
            {steps.map((step, stepIdx) => (
              <li key={step.id} className="relative overflow-hidden lg:flex-1">
                <div
                  className={clsx(
                    stepIdx === 0 ? "rounded-t-md border-b-0" : "",
                    stepIdx === steps.length - 1
                      ? "rounded-b-md border-t-0"
                      : "",
                    "overflow-hidden border border-gray-200 lg:border-0"
                  )}
                >
                  {step.status === StepStatus.complete ? (
                    <CompleteStep stepIdx={stepIdx} step={step} />
                  ) : step.status === StepStatus.current ? (
                    <CurrentStep stepIdx={stepIdx} step={step} />
                  ) : (
                    <UpcomingStep stepIdx={stepIdx} step={step} />
                  )}
                  {stepIdx !== 0 ? (
                    <>
                      {/* Separator */}
                      <div
                        className="absolute inset-0 top-0 left-0 hidden w-3 lg:block"
                        aria-hidden="true"
                      >
                        <svg
                          className="h-full w-full text-gray-300"
                          viewBox="0 0 12 82"
                          fill="none"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M0.5 0V31L10.5 41L0.5 51V82"
                            stroke="currentcolor"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                      </div>
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

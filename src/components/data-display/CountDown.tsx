import { FC } from "react";
import useCountdown from "@bradgarropy/use-countdown";

export interface CountDownProps {
  /**
   * Subtitle to display below the countdown
   */
  subTitle: string;
  /**
   *  Time remaining in seconds
   */
  timeRemaining: number;
}

export const CountDown: FC<CountDownProps> = ({ subTitle, timeRemaining }) => {
  const countdown = useCountdown({
    seconds: timeRemaining,
    format: "mm:ss",
    onCompleted: () => countdown.reset(),
  });

  return (
    <div className="pb-6 text-center sm:p-6">
      <div className="text-xl sm:text-4xl">{countdown.formatted}</div>
      <div className="pt-2">
        <h3 className="text-[8px] sm:text-xs">{subTitle}</h3>
      </div>
    </div>
  );
};

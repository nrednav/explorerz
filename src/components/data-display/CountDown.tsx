import { FC, useEffect, useState } from "react";

export interface CountDownProps {
  /**
   * Subtitle to display below the countdown
   */
  subTitle: string;
}

export const CountDown: FC<CountDownProps> = ({ subTitle }) => {
  // TODO: get time left from contract
  const [timeLeft, setTimeLeft] = useState<number>(9 * 100000);

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft((timeLeft) => timeLeft - 1000);
    }, 1000);
    if (timeLeft === 0) {
      setTimeLeft(9 * 100000);
    }
    return () => clearInterval(timeLeft);
  }, [timeLeft]);

  const minutesLeft = Math.floor(timeLeft / 1000 / 60);
  const displayMinutes = minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft;
  const secondsLeft = Math.floor((timeLeft / 1000) % 60);
  const displaySeconds = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;

  return (
    <div className="p-6 text-center">
      <div className="text-4xl">
        {displayMinutes}:{displaySeconds}
      </div>
      <div className="pt-2">
        <h3 className="text-xs">{subTitle}</h3>
      </div>
    </div>
  );
};

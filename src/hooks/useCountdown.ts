import { useEffect, useState } from "react";
import { PROMO } from "../lib/constants";

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  over: boolean;
}

function compute(target: number): Countdown {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
    over: diff === 0,
  };
}

/** Compte à rebours jusqu'à la fin de la promo (rafraîchi chaque seconde) */
export function useCountdown(targetDate: string | number | Date = PROMO.endDate): Countdown {
  const target = new Date(targetDate).getTime();
  const [count, setCount] = useState<Countdown>(() => compute(target));

  useEffect(() => {
    setCount(compute(target));
    const id = window.setInterval(() => setCount(compute(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return count;
}

import { createContext, useContext, useEffect, useState } from "react";
import { CountDownContainer, Separetor } from "./styles";
import { differenceInSeconds } from "date-fns";
import { Cycle } from "../..";

// interface CountDownProps {
//   activeCycle: any;
//   setCycles: React.Dispatch<React.SetStateAction<Cycle[]>>;
//   currentSeconds: number;
//   totalSenconds: number;
//   cycles: Cycle[];
//   activeCycleId: string | null;
// }

export const CycleContext = createContext(
  {} as {
    activeCycleId: string | null;
    setActiveCycleId: React.Dispatch<React.SetStateAction<string | null>>;
    cycles: Cycle[];
    setCycles: React.Dispatch<React.SetStateAction<Cycle[]>>;
    amountSecondsPassed: number;
    setAmountSecondsPassed: React.Dispatch<React.SetStateAction<number>>;
    currentSeconds: number;
    totalSenconds: number;
    activeCycle: Cycle | undefined
  }
);

export function CountDown() {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const { activeCycleId, setActiveCycleId, cycles, setCycles, activeCycle, totalSenconds, currentSeconds } =
    useContext(CycleContext);
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );
        if (secondsDifference >= totalSenconds) {
          setCycles(
            cycles.map((cycle) => {
              if (cycle.id == activeCycleId) {
                return { ...cycle, fineshedDate: new Date() };
              } else {
                return cycle;
              }
            })
          );
          setAmountSecondsPassed(totalSenconds);
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSenconds, activeCycleId]);

  return (
    <CycleContext.Provider
      value={{
        activeCycleId,
        setActiveCycleId,
        cycles,
        setCycles,
        amountSecondsPassed,
        setAmountSecondsPassed,
        currentSeconds,
        totalSenconds,
        activeCycle
      }}
    >
      <div>
        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separetor>:</Separetor>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>
      </div>
    </CycleContext.Provider>
  );
}

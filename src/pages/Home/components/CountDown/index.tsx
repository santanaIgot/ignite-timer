import { createContext, useContext, useEffect, useState } from "react";
import { CountDownContainer, Separetor } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../..";

// interface CountDownProps {
//   activeCycle: any;
//   setCycles: React.Dispatch<React.SetStateAction<Cycle[]>>;
//   currentSeconds: number;
//   totalSenconds: number;
//   cycles: Cycle[];
//   activeCycleId: string | null;
// }


interface HomeContextType {
  setAmountSecondsPassed: React.Dispatch<React.SetStateAction<number>>
}




export function CountDown() {
  const { activeCycle, cycles, setCycles, activeCycleId, setAmountSecondsPassed,amountSecondsPassed } = useContext(CyclesContext);
  const totalSenconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
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

  
  const currentSeconds = activeCycle ? totalSenconds - amountSecondsPassed : 0;
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

   useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);
  return (
      <div>
        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separetor>:</Separetor>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>
      </div>
 
  );
}

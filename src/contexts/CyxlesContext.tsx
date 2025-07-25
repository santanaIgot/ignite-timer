import { createContext, useEffect, useReducer, useState } from "react";
import { Cycle } from "../pages/Home";
import {cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction } from "../reducers/cycles/actions";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  cycles: Cycle[];
  activeCycleId: string | null;
  setAmountSecondsPassed: React.Dispatch<React.SetStateAction<number>>;
  amountSecondsPassed: number;
  handleCreateNewCycle(data: CreateCycleData): void;
  handleInterruptCycle(): void;
}



export const CyclesContext = createContext({} as CyclesContextType);

export function CyclesContextProvider({ children }: any) {


  const [cycleState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null
  }, ()=>{
    const storageStatAsJson = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')
    if(storageStatAsJson){
      return JSON.parse(storageStatAsJson)
    }
  });

  const { cycles, activeCycleId } = cycleState;

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);

  useEffect(()=>{
    const stateJson = JSON.stringify(cycleState)

    console.log('Seu json:',stateJson);
    
    //salvando no localStorage
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0',stateJson)
  }, [cycleState])

  function handleCreateNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    dispatch(addNewCycleAction(newCycle));
    // setCycles((state) => [...state, newCycle]);
    // setActiveCycleId(id);
    setAmountSecondsPassed(0);
    console.log(data);
    //   reset();
  }

  function handleInterruptCycle() {
    dispatch(interruptCurrentCycleAction());
    // setCycles(
    //   cycles.map((cycle) => {
    //     if (cycle.id == activeCycleId) {
    //       return { ...cycle, interruptDate: new Date() };
    //     } else {
    //       return cycle;
    //     }
    //   })
    // );
    // setActiveCycleId(null);
  }
  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        cycles,
        setAmountSecondsPassed,
        amountSecondsPassed,
        handleCreateNewCycle,
        handleInterruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}

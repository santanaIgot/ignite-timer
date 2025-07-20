import { createContext, useReducer, useState } from "react";
import { Cycle } from "../pages/Home";
import { ActionsTypes, cyclesReducer } from "../reducers/cycles";

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
  });

  const { cycles, activeCycleId } = cycleState;

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);

  function handleCreateNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    dispatch({
      type: ActionsTypes.ADD_NEW_CYCLE,
      payload: {
        newCycle,
      },
    });
    // setCycles((state) => [...state, newCycle]);
    // setActiveCycleId(id);
    setAmountSecondsPassed(0);
    console.log(data);
    //   reset();
  }

  function handleInterruptCycle() {
    dispatch({
      type: ActionsTypes.INTERRUPT_CURRENT_CYCLE,
      payload: {
        activeCycleId,
      },
    });
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

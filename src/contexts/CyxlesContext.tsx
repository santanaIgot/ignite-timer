import { createContext, useReducer, useState } from "react";
import { Cycle } from "../pages/Home";

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

interface CycleState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function CyclesContextProvider({ children }: any) {
  const [cycleState, dispatch] = useReducer(
    (state: CycleState, action: any) => {
      console.log("Valor da variável cycles", state);
      console.log("Conteúdo do dispatch", action);

      if (action.type == "ADD_NEW_CYCLE") {
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id,
        };
      }

      

      if (action.type == "INTERRUPT_CURRENT_CYCLE") {
        console.log('id',state.activeCycleId);
        
        return {
          ...state,
          cycles: 
            state.cycles.map((cycle) => {
              if (cycle.id == state.activeCycleId) {
                return { ...cycle, interruptDate: new Date() };
              } else {
                return cycle;
              }
            }),
        
          activeCycleId: null,
        };
      }

      return state;
    },
    {
      cycles: [],
      activeCycleId: null,
    }
  );

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
      type: "ADD_NEW_CYCLE",
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
      type: "INTERRUPT_CURRENT_CYCLE",
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
